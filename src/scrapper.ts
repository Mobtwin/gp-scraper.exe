import axios from "axios";
import { getNextProxy } from "./proxies.js";
import dotenv from "dotenv";
import { generateGooglePlayHeaders } from "./headers.js";
import { extractDeveloper } from "./utils.js";
dotenv.config();

const BASE = process.env.IOS_API;

export async function fetchApp(appId: string) {
  const data = await withRetry(async () => {
    const url = `${BASE}/api/apps/${appId}`;

    const res = await axios.get(url, {
      timeout: 10000,
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
export async function fetchDev(
  devId: string,
  devName: string,
  isName: boolean
) {
  if (!isName) {
    const data = await withRetry(async () => {
      const proxy = getNextProxy();
      const headers = generateGooglePlayHeaders();
      const url = `${BASE}/api/developers/${devId}`;

      const res = await axios.get(url, {
        timeout: 10000,
        headers,
        validateStatus: (status) => status < 500,
      });
      if (
        res.data?.message &&
        res.data?.message !== "App not found (404)" &&
        !(res.data?.message as string)?.includes("fantasy-land/map")
      ) {
        throw new Error(res.data.message);
      }
      return res.data;
    });
    if (!(data?.message as string)?.includes("fantasy-land/map")) {
      return data.apps;
    }
    const dataName = await withRetry(async () => {
      const proxy = getNextProxy();
      const headers = generateGooglePlayHeaders();
      const url = `https://play.google.com/store/apps/developer?id=${devName}&hl=en&gl=us`;

      const res = await axios.get(url, {
        timeout: 10000,
        headers,
        validateStatus: (status) => status < 500,
      });
      if (res.status === 404) {
        return { message: "App not found (404)" };
      }
      return res.data;
    });
    if (dataName?.message === "App not found (404)") {
      return dataName;
    }
    const { ids, name } = extractDeveloper(dataName, devId);
    const apps = ids.map((id: string) => ({ appId: id }));
    return apps;
  }
  const data = await withRetry(async () => {
    const proxy = getNextProxy();
    const headers = generateGooglePlayHeaders();
    const url = `https://play.google.com/store/apps/developer?id=${devId}&hl=en&gl=us`;

    const res = await axios.get(url, {
      timeout: 10000,
      headers,
      validateStatus: (status) => status < 500,
    });
    if (res.status === 404) {
      return { message: "App not found (404)" };
    }
    return res.data;
  });
  if (data?.message === "App not found (404)") {
    return data;
  }
  const { ids, name } = extractDeveloper(data, devId);
  const apps = ids.map((id: string) => ({ appId: id }));
  return apps;
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
    return []
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
