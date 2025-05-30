import { G_Apps } from "./models/schema.js";
import { fetchApp, fetchSimilarApps } from "./scrapper.js";
import pLimit from "p-limit";
import { AppUpdateService } from "./services/update.service.js";

const CONCURRENCY = 40;
const twoDaysAgo = new Date(Date.now() - 100 * 60 * 1000); // 1 days in ms
const last = new Date();
export async function processApps(batchSize: number, skip: number) {
  const apps = await G_Apps.find(
    { updated_at: { $lt: twoDaysAgo } },
    { _id: 1 }
  ) //{updated_at:{$lt:twoDaysAgo}}
    .skip(skip)
    .limit(batchSize)
    .lean();
  const limit = pLimit(CONCURRENCY);
  const newApps: any[] = [];
  const updates: any[] = [];
  const tasks = apps.map((app) =>
    limit(async () => {
      const appId = app._id;
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
        const updateOb = updateService.updateTheApp(appData, dbApp);
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
    })
  );

  await Promise.all(tasks);
  if (updates.length) {
    try {
      await G_Apps.bulkWrite(updates, { ordered: false });
      console.log(`💾 Bulk updated ${updates.length} apps`);
      updates.length = 0; // flush the array
    } catch (err) {
      console.error(`❌ Error in bulk updates:`, err);
    }
  }

  if (newApps.length) {
    try {
      await G_Apps.bulkWrite(newApps, { ordered: false });
      console.log(`💾 Bulk inserted ${newApps.length} new similar apps`);
      newApps.length = 0; // flush the array
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
    const updateOb = updateService.updateTheApp(appData, dbApp);
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
