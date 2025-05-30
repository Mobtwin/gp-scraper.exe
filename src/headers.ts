// headers.ts

const androidVersions = ["12", "11", "10", "9", "8.1.0"];
const deviceModels = [
  "Pixel 6 Pro",
  "Pixel 5",
  "Samsung Galaxy S21",
  "Samsung Galaxy A52",
  "OnePlus 9",
  "Xiaomi Mi 11",
  "Motorola G Power"
];
const locales = ["en-US", "en-GB", "fr-FR", "de-DE", "es-ES", "pt-BR"];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomUserAgent(): string {
  const version = getRandomItem(androidVersions);
  const model = getRandomItem(deviceModels);
  const chromeMajor = 114 + Math.floor(Math.random() * 10); // 114–124
  const chromeBuild = `${chromeMajor}.0.${Math.floor(Math.random() * 5000)}.${Math.floor(Math.random() * 150)}`;

  return `Mozilla/5.0 (Linux; Android ${version}; ${model.replace(/ /g, "_")}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeBuild} Mobile Safari/537.36`;
}

export function generateGooglePlayHeaders(): Record<string, string> {
  const ua = getRandomUserAgent();
  const lang = getRandomItem(locales);

  return {
    "User-Agent": ua,
    "Accept-Language": lang,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Upgrade-Insecure-Requests": "1",
    "Referer": "https://play.google.com/",
    "X-Requested-With": "com.android.vending"
  };
}
