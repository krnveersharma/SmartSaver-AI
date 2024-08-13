const createClient = require("redis").createClient;
const CacheHandler = require("@neshca/cache-handler").CacheHandler;
const createLruCache = require("@neshca/cache-handler/local-lru").default;
const createRedisCache = require("@neshca/cache-handler/redis-strings").default;

CacheHandler.onCreation(async () => {
  const localCache = createLruCache({
    maxItemsNumber: 10000,
    maxItemSizeBytes: 1024 * 1024 * 250, // Limit to 250 MB
  });

  let redisCache;
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL env is not set, using local cache only.");
  } else {
    try {
      let isReady = false;

      const client = createClient({
        url: process.env.REDIS_URL, // Use the URL from .env
        socket: {
          reconnectStrategy: () => (isReady ? 5000 : false),
        },
      });

      client.on("error", (error) => {
        console.error("Redis error", error);
      });

      client.on("ready", () => {
        isReady = true;
      });

      await client.connect();
      console.log("Connected to Redis");
      redisCache = createRedisCache({
        client,
        keyPrefix: `next-shared-cache-${process.env.NEXT_PUBLIC_BUILD_NUMBER}:`,
        timeoutMs: 5000,
      });
    } catch (error) {
      console.log(
        "Failed to initialize Redis cache, using local cache only.",
        error
      );
    }
  }

  return {
    handlers: [redisCache, localCache].filter(Boolean),
    ttl: {
      defaultStaleAge: 86400,
      estimateExpireAge: (staleAge) => staleAge,
    },
  };
});

module.exports = CacheHandler;
