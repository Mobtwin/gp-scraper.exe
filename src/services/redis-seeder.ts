import { createClient } from "redis";
import pLimit from "p-limit";
import { fetchApp, fetchSimilarApps } from "../scrapper.js";
import { AppUpdateService } from "./update.service.js";
import { AppNotification, G_Apps } from "../database/mobtwin/models.js";
import { App } from "../types/model.types.js";
// import { CronJob } from 'cron';

export const redisClient = createClient({
  url: "redis://default:your_strong_password@100.42.182.147:6379",
});
await redisClient.connect();

// Daily key for tracking processed apps
const getDailyKey = () => `apps:${new Date().toISOString().split("T")[0]}`;
const CONCURRENCY = 100;
// Seed Redis with app IDs (run by only one server)
export async function seedAppIds() {
  const todayKey = getDailyKey();
  const lockKey = `${todayKey}:seed-lock`;

  // Try to acquire a distributed lock (expires in 10 minutes)
  const locked = await redisClient.set(lockKey, "seeding", {
    NX: true,
    EX: 600, // 10 minute expiration
  });

  if (locked !== "OK") {
    console.log("Another server is already seeding Redis");
    return false;
  }

  try {
    console.log("This server is seeding Redis...");

    // Check if already seeded today
    const seeded = await redisClient.exists(`${todayKey}:seeded`);
    if (seeded) {
      console.log("Redis already seeded today");
      return true;
    }
    const cursor = G_Apps.find({}, { _id: 1 }).lean().cursor();
    const seenIds = new Set<string>();

    for await (const doc of cursor) {
      const id = doc._id?.toString();

      if (!id || seenIds.has(id)) continue;

      seenIds.add(id);
      if (seenIds.size % 10000 === 0) {
        console.log("loaded " + seenIds.size + " Ids");
      }
    }
    const appIds = Array.from(seenIds);
    if (appIds.length === 0) {
      console.log("No apps to seed");
      return false;
    }

    // Pipeline Redis operations for efficiency
    const pipeline = redisClient.multi();

    // Create main processing queue
    pipeline.del(`${todayKey}:queue`);
    pipeline.rPush(`${todayKey}:queue`, appIds);

    // Create processing set
    pipeline.del(`${todayKey}:processing`);

    // Mark as seeded
    pipeline.set(`${todayKey}:seeded`, "true", { EX: 86400 }); // Expire in 24h

    await pipeline.exec();

    console.log(`Seeded ${appIds.length} app IDs into Redis`);
    return true;
  } catch (err) {
    console.error("Error seeding Redis:", err);
    return false;
  } finally {
    // Release the lock immediately after seeding
    await redisClient.del(lockKey);
  }
}
const dailyKey = new Date();
dailyKey.setUTCHours(0, 0, 0, 0); // Normalize to start of UTC day
export async function processAppsWithRedis(batchSize: number) {
  const todayKey = getDailyKey();

  // Check if Redis has been seeded today
  const seeded = await redisClient.exists(`${todayKey}:seeded`);
  if (!seeded) {
    console.log("Waiting for Redis seeding...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return false;
  }

  const processingKey = `${todayKey}:processing`;
  const queueKey = `${todayKey}:queue`;

  // Get a batch of apps to process
  const batch: string[] = [];

  for (let i = 0; i < batchSize; i++) {
    // Atomically move from queue to processing set
    const appId = await redisClient.lMove(
      queueKey,
      processingKey,
      "LEFT",
      "RIGHT"
    );

    if (!appId) break; // Queue is empty

    // Check if another instance is already processing
    const lockKey = `${todayKey}:lock:${appId}`;
    const lockAcquired = await redisClient.set(lockKey, "processing", {
      NX: true,
      EX: 300, // 5 minute expiration
    });

    if (lockAcquired === "OK") {
      batch.push(appId);
    } else {
      // If lock exists, move back to queue
      await redisClient.rPush(queueKey, appId);
      await redisClient.sRem(processingKey, appId);
    }
  }

  if (batch.length === 0) {
    // Check if processing is complete
    const remaining = await redisClient.llen(queueKey);
    const processing = await redisClient.sCard(processingKey);

    if (remaining === 0 && processing === 0) {
      console.log("All apps processed for today");
      return "COMPLETE";
    }
    return false;
  }

  const limit = pLimit(CONCURRENCY);
  const newApps: any[] = [];
  const newAppsNotifications: any[] = [];
  const seenNewAppIds = new Set();
  const updates: any[] = [];
  const updatesNotifications: any[] = [];
  const tasks = batch.map((id) =>
    limit(async () => {
      const appId = id;
      try {
        const appData = await fetchApp(appId);
        const dbApp = await G_Apps.findById(appId);
        if (!dbApp) {
          console.log(`⚠️ App ${appId} not found in database.`);
          return;
        }
        if (appData?.message === "App not found (404)") {
          // App is suspended — mark it
          updates.push({
            updateOne: {
              filter: { _id: appId },
              update: {
                $set: {
                  removed: new Date(),
                  updated_at: new Date(),
                  published: false,
                },
              },
            },
          });
          // check if it is already suspended
          if (dbApp.published) {
            updatesNotifications.push({
              insertOne: {
                document: {
                  type:
                    dbApp.type === "GAME"
                      ? "published_gp_game_suspended"
                      : "published_gp_app_suspended",
                  appId: dbApp._id,
                  appName: dbApp.name,
                  developerId: dbApp.devId,
                  developerName: dbApp.devName,
                  relatedTo: appId,
                  dailyKey,
                  createdAt: new Date(),
                  metadata: {
                    icon: dbApp.icon,
                    updated: dbApp.updated,
                    published: false,
                    released: dbApp.released,
                  },
                },
              },
            });
          } else {
            updatesNotifications.push({
              insertOne: {
                document: {
                  type:
                    dbApp.type === "GAME"
                      ? "suspended_gp_game"
                      : "suspended_gp_app",
                  appId: dbApp._id,
                  appName: dbApp.name,
                  developerId: dbApp.devId,
                  developerName: dbApp.devName,
                  relatedTo: appId,
                  dailyKey,
                  createdAt: new Date(),
                  metadata: {
                    icon: dbApp.icon,
                    updated: dbApp.updated,
                    published: false,
                    released: dbApp.released,
                  },
                },
              },
            });
          }
          console.log(`⚠️ App ${appId} marked as suspended.`);
          return;
        }

        const updateService = new AppUpdateService();

        const updateOb = updateService.updateTheApp(appData, dbApp as App);
        console.log(`👌 updated an app: ${appId}`);
        updates.push(updateOb);
        // Fetch similar apps from separate endpoint
        const similar = await fetchSimilarApps(appId);

        const similarIds: string[] = [];

        for (const similarApp of similar || []) {
          const id = similarApp.appId;
          if (!id) continue;

          similarIds.push(id);

          const exists = await G_Apps.exists({ _id: id });
          if (!exists && !seenNewAppIds.has(id)) {
            const similarData = await fetchApp(id);
            if (similarData?.message === "App not found (404)") {
              // App is suspended — mark it
              console.log(`⚠️ App ${id} suspended but we dont have it.`);
              return;
            }
            const appSyntax = updateService.createAppSyntax(similarData);
            seenNewAppIds.add(id);
            newApps.push({
              updateOne: {
                filter: { _id: appSyntax._id },
                update: { $setOnInsert: appSyntax },
                upsert: true,
              },
            });
            newAppsNotifications.push({
              insertOne: {
                document: {
                  type:
                    appSyntax.type === "GAME" ? "new_gp_game" : "new_gp_app",
                  appId: appSyntax._id,
                  appName: appSyntax.name,
                  developerId: appSyntax.devId,
                  developerName: appSyntax.devName,
                  relatedTo: appId,
                  dailyKey,
                  createdAt: new Date(),
                  metadata: {
                    icon: appSyntax.icon,
                    url: appSyntax.website,
                    price: appSyntax.price,
                    released: appSyntax.released,
                  },
                },
              },
            });
            console.log(`🆕 Discovered new app: ${id}`);
          }
        }
        // check if it is already suspended
        if (!dbApp.published) {
          updatesNotifications.push({
            insertOne: {
              document: {
                type:
                  dbApp.type === "GAME"
                    ? "unpublished_gp_game_published"
                    : "unpublished_gp_app_published",
                appId: dbApp._id,
                appName: dbApp.name,
                developerId: dbApp.devId,
                developerName: dbApp.devName,
                relatedTo: appId,
                dailyKey,
                createdAt: new Date(),
                metadata: {
                  icon: dbApp.icon,
                  updated: appData.updated,
                  published: true,
                  released: dbApp.released,
                },
              },
            },
          });
        } else {
          updatesNotifications.push({
            insertOne: {
              document: {
                type:
                  dbApp.type === "GAME"
                    ? "old_gp_game_updated"
                    : "old_gp_app_updated",
                appId: dbApp._id,
                appName: dbApp.name,
                developerId: dbApp.devId,
                developerName: dbApp.devName,
                relatedTo: appId,
                dailyKey,
                createdAt: new Date(),
                metadata: {
                  icon: dbApp.icon,
                  updated: appData.updated,
                  published: true,
                  released: dbApp.released,
                },
              },
            },
          });
        }
        // Collect update for main app
        if (similarIds.length > 0) {
          updates.push({
            updateOne: {
              filter: { _id: appId },
              update: {
                $set: {
                  similarApps: similarIds,
                  updated_at: new Date(),
                },
              },
            },
          });
        }
        console.log(
          `✅ Updated app ${appId} with ${similarIds.length} similar apps`
        );
      } catch (err: any) {
        console.error(`❌ Error processing ${appId}:`, err.message);
      }
    })
  );

  await Promise.all(tasks);
  if (updates.length) {
    try {
      await G_Apps.bulkWrite(updates, { ordered: false });
      console.log(`💾 Bulk updated ${updates.length} apps`);
      await AppNotification.bulkWrite(updatesNotifications, { ordered: false });

      updatesNotifications.length = 0; // flush the array
      updates.length = 0; // flush the array
    } catch (err) {
      console.error(`❌ Error in bulk updates:`, err);
    }
  }

  if (newApps.length) {
    try {
      await G_Apps.bulkWrite(newApps, { ordered: false });
      console.log(`💾 Bulk inserted ${newApps.length} new similar apps`);
      await AppNotification.bulkWrite(newAppsNotifications, { ordered: false });
      newApps.length = 0; // flush the array
      newAppsNotifications.length = 0; // flush the array
    } catch (err: any) {
      if (
        err.code === 11000 ||
        err.writeErrors?.some((e: any) => e.code === 11000)
      ) {
        console.warn(
          `⚠️ Some apps already existed — ignoring duplicate key errors`
        );
      } else {
        console.error(`❌ Unexpected error in insertMany:`, err);
        throw err; // Re-throw non-duplicate errors
      }
    }
  }
  const pipeline = redisClient.multi();
  batch.forEach((appId) => {
    pipeline.lRem(processingKey, 0, appId);
    pipeline.del(`${todayKey}:lock:${appId}`);
  });
  try {
    const results = await pipeline.exec();
  } catch (err) {
    console.error("Pipeline execution failed:", err);
  }
  return true;
}
// // Initialize seeding on server start
// seedAppIds().catch(console.error);

// // Daily cron job to re-seed at midnight
// new CronJob(
//   '0 0 * * *', // Midnight
//   () => {
//     redisClient.del(getDailyKey()); // Clear previous day's data
//     seedAppIds().catch(console.error);
//   },
//   null,
//   true,
//   'UTC'
// );
