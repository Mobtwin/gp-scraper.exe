import axios from "axios";
import { getNextProxy } from "./proxies.js";
import dotenv from "dotenv";
import { generateGooglePlayHeaders } from "./headers.js";
dotenv.config();

const BASE = process.env.IOS_API;

export async function fetchApp(appId: string) {
  const data = await withRetry(async () => {
    const proxy = getNextProxy();
    const headers = generateGooglePlayHeaders();
    const url = `${BASE}/api/apps/${appId}`;

    const res = await axios.get(url, {
      timeout: 10000,
      headers,
      validateStatus: (status) => status < 500,
    });

    return res.data;
  });

  if (!data) {
    // This is a normal (non-retriable) case
    throw new Error("No data returned for app " + appId);
  }

  return data;
}
export async function fetchDev(devId: string) {
  const data = await withRetry(async () => {
    const proxy = getNextProxy();
    const headers = generateGooglePlayHeaders();
    const url = `${BASE}/api/developers/${devId}`;

    const res = await axios.get(url, {
      timeout: 10000,
      headers,
      validateStatus: (status) => status < 500,
    });
    if (res.data?.message && (res.data?.message !== "App not found (404)")) {
      throw new Error(res.data.message);
    }
    return res.data;
  });

  return data.apps;
}

export async function fetchSimilarApps(appId: string) {
  const data = await withRetry(async () => {
    const proxy = getNextProxy();
    const headers = generateGooglePlayHeaders();

    const url = `${BASE}/api/apps/${appId}/similar`;

    const res = await axios.get(url, {
      timeout: 10000,
      headers,
      validateStatus: (status) => status < 500,
    });

    return res.data;
  });

  if (!data?.data) {
    // Again, no retry — just return empty or throw
    throw new Error("No similar apps found for " + appId);
  }

  return data.data;
}
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (attempt === maxAttempts) {
        throw new Error(
          `Failed after ${attempt} attempts: ${(err as Error).message}`
        );
      }
      console.warn(`Retrying after error: ${(err as Error).message}`);
      await new Promise((res) => setTimeout(res, delayMs * attempt)); // Exponential-ish backoff
    }
  }
  throw new Error("Unreachable");
}
