import { connectToDb } from "./db.js";
import { processApps, processDevs } from "./processor.js";
import dotenv from "dotenv";
dotenv.config();
export function getTimePassed(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    formatted: `${hours}h ${minutes}m ${seconds}s`,
  };
}
async function main() {
  const startFun = new Date();
  await connectToDb();
  const limit = parseInt(process.env.LIMIT as string);
  const index = parseInt(process.env.INDEX as string);
  let skip = limit * index || 0;
  console.log(`configuration: limit: ${limit}, index:${index}, skip:${skip}`);
  const batchSize = 1500;
  let processedCount = 0;
  let stillDevs = true;
  let stillApps = true;
  const statsInterval = setInterval(() => {
    const { formatted } = getTimePassed(startFun, new Date());
    console.log(`
========= 🛰️ ${!stillDevs ? "App" : "Dev"} Processing Stats =========
🟢 Processed ${!stillDevs ? "apps" : "devs"}:   ${processedCount}
⛳ Start Time: ${startFun.toDateString()}
⏱️  Time elapsed:     ${formatted}
➡️  Current skip:     ${skip}
===========================================
`);
  }, 60 * 1000);
  while (stillDevs) {
    stillDevs = await processDevs(batchSize, skip);
    // skip += batchSize;
    processedCount += batchSize;
  }
  skip = limit * index || 0;
  processedCount = 0;
  while (stillApps) {
    console.log(`Processing batch starting from skip ${skip}`);
    const start = new Date();
    stillApps = await processApps(batchSize, skip);
    const end = new Date();
    console.log(`batch took : ${getTimePassed(start, end).formatted}`);
    // skip += batchSize;
    processedCount += batchSize;
  }
  const endFun = new Date();
  console.log(
    `${processedCount} processed took : ${
      getTimePassed(startFun, endFun).formatted
    }`
  );
  console.log("completed all!");
}

main().catch(console.error);
// async function test() {
//   const developerId = 'Jeedom'; // example ID
//   const url = `https://play.google.com/store/apps/developer?id=${developerId}&hl=en`;
//   const response = await axios.get(url, {
//     headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
    
//   });
//   const developer = extractDeveloper(response.data, developerId);
//   console.log(developer);
// }

// test().catch(console.error);