import { Redis } from "@upstash/redis";

export type Operativo = {
  id: number;
  chatId: number;
  text: string;
  date: number; // epoch ms
  author: string;
};

const FEED_KEY = "operativos:feed";
const FEED_MAX = 50;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

export async function saveOperativo(entry: Operativo): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.lpush(FEED_KEY, JSON.stringify(entry));
  await redis.ltrim(FEED_KEY, 0, FEED_MAX - 1);
}

export async function getOperativos(): Promise<Operativo[]> {
  const redis = getRedis();
  if (!redis) return [];
  const raw = await redis.lrange<string | Operativo>(FEED_KEY, 0, FEED_MAX - 1);
  return raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as Operativo) : r));
}

export function isStorageConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
