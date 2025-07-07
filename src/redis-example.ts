// import { createClient } from 'redis';

// // Initialize Redis client
// const redisClient = createClient({ url: 'redis://localhost:6379' });
// await redisClient.connect();

// export async function processAppsWithLock(batchSize: number, skip: number) {
//   // First, get all eligible app IDs and store them in Redis
//   const allAppIds = await G_Apps.find(
//     { updated_at: { $lt: dailyKey } },
//     { _id: 1 }
//   ).lean();
  
//   // Create a processing queue in Redis
//   const queueKey = `app-processing-queue:${dailyKey}`;
//   const processingKey = `app-processing:${dailyKey}`;
  
//   // Initialize the queue if empty
//   if (await redisClient.llen(queueKey) === 0) {
//     const ids = allAppIds.map(app => app._id.toString());
//     if (ids.length > 0) {
//       await redisClient.rPush(queueKey, ids);
//     }
//   }

//   // Get a batch of apps to process
//   const batch: string[] = [];
  
//   for (let i = 0; i < batchSize; i++) {
//     // Try to get an app ID that's not being processed
//     const appId = await redisClient.lMove(
//       queueKey,
//       processingKey,
//       'LEFT',
//       'RIGHT'
//     );
    
//     if (!appId) break; // No more apps to process
    
//     // Check if another instance is already processing this
//     const lockKey = `app-lock:${appId}`;
//     const lockAcquired = await redisClient.set(lockKey, 'processing', {
//       NX: true,
//       EX: 300 // Lock expires in 5 minutes
//     });
    
//     if (lockAcquired === 'OK') {
//       batch.push(appId);
//     } else {
//       // If we couldn't get the lock, put it back in the queue
//       await redisClient.rPush(queueKey, appId);
//     }
//   }

//   if (batch.length === 0) {
//     return false;
//   }

//   // Process the batch (similar to your existing code)
//   const limit = pLimit(CONCURRENCY);
//   const newApps: any[] = [];
//   const newAppsNotifications: any[] = [];
//   const seenNewAppIds = new Set();
//   const updates: any[] = [];
//   const updatesNotifications: any[] = [];

//   const tasks = batch.map((appId) =>
//     limit(async () => {
//       try {
//         // Your existing processing logic here...
//         const appData = await fetchApp(appId);
//         const dbApp = await G_Apps.findById(appId);
//         // ... rest of your processing code
        
//         // After successful processing, remove from processing set
//         await redisClient.sRem(processingKey, appId);
//         await redisClient.del(`app-lock:${appId}`);
        
//       } catch (err) {
//         console.error(`❌ Error processing ${appId}:`, err.message);
//         // On failure, return the app ID to the queue
//         await redisClient.rPush(queueKey, appId);
//         await redisClient.sRem(processingKey, appId);
//         await redisClient.del(`app-lock:${appId}`);
//       }
//     })
//   );

//   await Promise.all(tasks);
  
//   // Your existing bulk write operations...
//   if (updates.length) {
//     try {
//       await G_Apps.bulkWrite(updates, { ordered: false });
//       console.log(`💾 Bulk updated ${updates.length} apps`);
//       await AppNotification.bulkWrite(updatesNotifications, { ordered: false });
//       updatesNotifications.length = 0;
//       updates.length = 0;
//     } catch (err) {
//       console.error(`❌ Error in bulk updates:`, err);
//     }
//   }

//   if (newApps.length) {
//     try {
//       await G_Apps.bulkWrite(newApps, { ordered: false });
//       console.log(`💾 Bulk inserted ${newApps.length} new similar apps`);
//       await AppNotification.bulkWrite(newAppsNotifications, { ordered: false });
//       newApps.length = 0;
//       newAppsNotifications.length = 0;
//     } catch (err: any) {
//       if (err.code === 11000 || err.writeErrors?.some((e: any) => e.code === 11000)) {
//         console.warn(`⚠️ Some apps already existed — ignoring duplicate key errors`);
//       } else {
//         console.error(`❌ Unexpected error in insertMany:`, err);
//         throw err;
//       }
//     }
//   }

//   return true;
// }