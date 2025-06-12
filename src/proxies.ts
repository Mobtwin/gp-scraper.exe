import dotenv from "dotenv";
dotenv.config();




let index = 0;
const proxies = parseInt(process.env.INDEX as string) === 0 ? [] : parseInt(process.env.INDEX as string) === 1 ? [] :  [];
// const proxies = [...proxies_1,...proxies_2];
export function getNextProxy(): string {
  const proxy = proxies[index];
  index = (index + 1) % proxies.length;
  return proxy;
}
