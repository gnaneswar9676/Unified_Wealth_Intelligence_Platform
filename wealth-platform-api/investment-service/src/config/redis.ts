import Redis from "ioredis";

const redis = new Redis({

  host: "127.0.0.1",

  port: 6379,

  maxRetriesPerRequest: 1,

  retryStrategy(times) {

    if (times > 3) {

      console.log(
        "Redis retries exhausted ❌"
      );

      return null;

    }

    return Math.min(
      times * 100,
      3000
    );

  }

});

redis.on("connect", () => {

  console.log(
    "Redis Connected 🚀"
  );

});

redis.on("error", (err) => {

  console.log(
    "Redis Error:",
    err.message
  );

});

export default redis;