import { fetchApp, fetchDev, fetchSimilarApps } from "./scrapper.js";
import pLimit from "p-limit";
import { AppUpdateService } from "./services/update.service.js";
import {
  AppNotification,
  G_Apps,
  G_Developers,
} from "./database/mobtwin/models.js";
import { App } from "./types/model.types.js";

const CONCURRENCY = 100;
const twoDaysAgo = new Date(Date.now() - 5 * 60 * 60 * 1000); // 1 days in ms
const last = new Date();
const createdAt = new Date();
const dailyKey = new Date(createdAt);
dailyKey.setUTCHours(0, 0, 0, 0); // Normalize to start of UTC day
export async function processApps(batchSize: number, skip: number) {
  const apps = await G_Apps.find(
    { updated_at: { $lt: dailyKey } },
    { _id: 1 }
  ) //{updated_at:{$lt:twoDaysAgo}}
    .skip(skip)
    .limit(batchSize)
    .lean();
  if (apps.length === 0) {
    return false;
  }
  const limit = pLimit(CONCURRENCY);
  const newApps: any[] = [];
  const newAppsNotifications: any[] = [];
  const seenNewAppIds = new Set();
  const updates: any[] = [];
  const updatesNotifications: any[] = [];
  const tasks = apps.map((app) =>
    limit(async () => {
      const appId = app._id;
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
                  type: dbApp.type=== "GAME" 
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
          }else{
            updatesNotifications.push({
              insertOne: {
                document: {
                  type: dbApp.type=== "GAME" 
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
                  type: appSyntax.type=== "GAME" 
                    ? "new_gp_game"
                    : "new_gp_app",
                  appId: id,
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
                type: dbApp.type=== "GAME" 
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
        }else{
          updatesNotifications.push({
            insertOne: {
              document: {
                type: dbApp.type=== "GAME" 
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
  return true;
}
// processDevs.ts

export async function processDevs(batchSize: number, skip: number) {
  const devs = await G_Developers.find(
    { updated_at: { $lt: dailyKey }, accountState: true },
    { _id: 1, name: 1 }
  )
    .skip(skip)
    .limit(batchSize)
    .lean();

  if (devs.length === 0) {
    return false;
  }

  const limit = pLimit(50);
  const newApps: any[] = [];
  const newAppsNotifications: any[] = [];
  const updates: any[] = [];
  const seenAppIds = new Set();

  const tasks = devs.map((dev) =>
    limit(async () => {
      let devId;
      let isName = false;
      if (/^[0-9]+$/.test(dev._id || "false")) {
        devId = dev._id;
        isName = false;
      } else {
        devId = dev.name;
        isName = true;
      }
      if (!devId) {
        console.log("dev id is null returning ❌");
        return;
      }
      try {
        const apps = await fetchDev(devId, dev.name!, isName);
        if (apps?.message === "App not found (404)") {
          console.log(`⚠️ Dev ${devId} not found or suspended.`);
          updates.push({
            updateOne: {
              filter: { _id: dev._id },
              update: {
                $set: {
                  removed: new Date(),
                  updated_at: new Date(),
                  accountState: false,
                },
              },
            },
          });
          return;
        }
        for (const app of apps || []) {
          const appId = app.appId;
          if (!appId || seenAppIds.has(appId)) continue;

          const exists = await G_Apps.exists({ _id: appId });
          if (exists) continue;

          const appData = await fetchApp(appId);
          if (!appData || appData?.message === "App not found (404)") {
            console.log(`⚠️ App ${appId} not found or suspended.`);
            continue;
          }

          const updateService = new AppUpdateService();
          const appSyntax = updateService.createAppSyntax(appData);
          seenAppIds.add(appId);

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
                  type: appSyntax.type=== "GAME" 
                    ? "new_gp_game"
                    : "new_gp_app",
                  appId: appSyntax._id,
                  appName: appSyntax.name,
                  developerId: appSyntax.devId,
                  developerName: appSyntax.devName,
                  relatedTo: null,
                  dailyKey,
                  createdAt: new Date(),
                  metadata: {
                    icon: appSyntax.icon,
                    url: appSyntax.website,
                    updated: appSyntax.updated,
                    released: appSyntax.released,
                  },
                },
              },
            });

          console.log(`🆕 New app from ${devId}: ${appId}`);
        }
        updates.push({
          updateOne: {
            filter: { _id: dev._id },
            update: {
              $set: {
                updated_at: new Date(),
              },
            },
          },
        });
      } catch (err: any) {
        console.error(`❌ Error processing dev ${devId}:`, err.message);
      }
    })
  );

  await Promise.all(tasks);

  if (newApps.length) {
    try {
      await G_Apps.bulkWrite(newApps, { ordered: false });
      console.log(`💾 Bulk inserted ${newApps.length} new apps`);
      await AppNotification.bulkWrite(newAppsNotifications, { ordered: false });
      newAppsNotifications.length = 0;
      newApps.length = 0;
    } catch (err: any) {
      if (
        err.code === 11000 ||
        err.writeErrors?.some((e: any) => e.code === 11000)
      ) {
        console.warn(`⚠️ Duplicate key errors ignored`);
      } else {
        console.error(`❌ Unexpected error inserting new apps:`, err);
        throw err;
      }
    }
  }
  if (updates.length) {
    try {
      await G_Developers.bulkWrite(updates, { ordered: false });
      console.log(`💾 Bulk updated ${updates.length} devs`);
      updates.length = 0;
    } catch (err: any) {
      if (
        err.code === 11000 ||
        err.writeErrors?.some((e: any) => e.code === 11000)
      ) {
        console.warn(`⚠️ Duplicate key errors ignored`);
      } else {
        console.error(`❌ Unexpected error updating devs:`, err);
        throw err;
      }
    }
  }
  return true;
}

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Timeout")), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(id));
  });
}
const proccessSingleApp = async (
  appId: string,
  updates: any[],
  newApps: any[]
) => {
  try {
    const appData = await fetchApp(appId);
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
      console.log(`⚠️ App ${appId} marked as suspended.`);
      return;
    }
    const updateService = new AppUpdateService();
    const dbApp = await G_Apps.findById(appId);
    if (!dbApp) {
      console.log(`⚠️ App ${appId} not found in database.`);
      return;
    }
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
      if (!exists) {
        const similarData = await fetchApp(id);
        if (similarData?.message === "App not found (404)") {
          // App is suspended — mark it
          console.log(`⚠️ App ${appId} suspended but we dont have it.`);
          return;
        }
        const appSyntax = updateService.createAppSyntax(similarData);
        newApps.push({
          updateOne: {
            filter: { _id: appSyntax._id },
            update: { $setOnInsert: appSyntax },
            upsert: true,
          },
        });
        console.log(`🆕 Discovered new app: ${id}`);
      }
    }

    // Collect update for main app
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
    console.log(
      `✅ Updated app ${appId} with ${similarIds.length} similar apps`
    );
  } catch (err: any) {
    console.error(`❌ Error processing ${appId}:`, err.message);
  }
};
const BATCH_SIZE = 10000;

export async function updateGpDevs(
  batchSize: number,
  skip: number,
  rawDevs: { devId: string; devName: string }[]
) {
  if (rawDevs.length === 0) {
    return false;
  }

  const limit = pLimit(150);
  const inserts: any[] = [];
  const seen = new Set<string>();

  const tasks = rawDevs.map((doc) =>
    limit(async () => {
      const devId = doc.devId;
      const devName = doc.devName;

      if (!devId || seen.has(devId)) return;

      seen.add(devId);

      const variants = [devId, devName, devName?.split(" ").join("+")];
      const exist = await G_Developers.exists({ _id: { $in: variants } });
      if (exist) return;

      let isName = !/^[0-9]+$/.test(devId);
      const actualId = isName ? devName : devId;

      try {
        const apps = await fetchDev(actualId, devName, isName);

        if (!apps || apps.message === "App not found (404)") {
          console.log(`⚠️ Dev ${actualId} not found or suspended.`);
          inserts.push({
            _id: actualId,
            accountState: false,
          });
        } else {
          inserts.push({
            _id: actualId,
            name: apps?.[0]?.developer || devName,
            accountState: true,
          });
          console.log(`🆕 New dev found: ${actualId}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${actualId}:`, err);
      }
    })
  );

  await Promise.all(tasks);

  if (inserts.length) {
    try {
      await G_Developers.insertMany(inserts, { ordered: false });
      console.log(`📦 Inserted ${inserts.length} new devs`);
    } catch (err: any) {
      if (
        err.code === 11000 ||
        err.writeErrors?.some((e: any) => e.code === 11000)
      ) {
        console.warn(`⚠️ Duplicate key errors ignored`);
      } else {
        console.error(`❌ Insert error:`, err);
        throw err;
      }
    }
  }

  return true;
}
export async function fetchAllUniqueDevIdsWithNames(): Promise<
  { devId: string; devName: string }[]
> {
  const seenDevIds = new Set<string>();
  const uniqueDevs: { devId: string; devName: string }[] = [];

  const cursor = G_Apps.find({}, { devId: 1, devName: 1 }).lean().cursor();

  for await (const doc of cursor) {
    const devId = doc.devId?.toString();
    const devName = doc.devName?.toString() || "";

    if (!devId || seenDevIds.has(devId)) continue;

    seenDevIds.add(devId);
    uniqueDevs.push({ devId, devName });
    if (uniqueDevs.length % 10000 === 0) {
      console.log("loaded " + uniqueDevs.length + " devIds");
    }
  }

  console.log(
    `✅ Fetched ${uniqueDevs.length} unique devId+devName pairs from G_Apps`
  );
  return uniqueDevs;
}

export const processSingleApplication = async () => {
  const newApps: any[] = [];
  const newAppsNotifications: any[] = [];
  const seenNewAppIds = new Set();
  const updates: any[] = [];
  const updatesNotifications: any[] = [];
  const appId = "com.noorgames.joinnumbers";
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
        console.log(similarData)
        const appSyntax = updateService.createAppSyntax(similarData);
        console.log(appSyntax)
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
              type: appSyntax.type === "GAME" ? "new_gp_game" : "new_gp_app",
              appId: id,
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
  if (updates.length) {
    try {
      await G_Apps.bulkWrite(updates, { ordered: false });
      console.log(`💾 Bulk updated ${updates.length} apps`);
      const res = await AppNotification.bulkWrite(updatesNotifications, { ordered: false });
      console.log({noti:res})
      updatesNotifications.length = 0; // flush the array
      updates.length = 0; // flush the array
    } catch (err) {
      console.error(`❌ Error in bulk updates:`, err);
    }
  }

  if (newApps.length) {
    try {
      const res2 = await G_Apps.bulkWrite(newApps, { ordered: false });
      console.log(res2)
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
};
