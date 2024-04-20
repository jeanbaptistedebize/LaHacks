import { RedisClientType, createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from 'setup';

class RedisCacheService {
  static client: RedisClientType = null;

  static async connect() {
    RedisCacheService.client = createClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    });

    await RedisCacheService.client.connect();
    await RedisCacheService.client.auth({
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
    });
  }

  static async run(...args: any[]) {
    if (RedisCacheService.client === null) {
      await RedisCacheService.connect();
    }

    const data = await RedisCacheService.client.sendCommand(
      args.map((arg) =>
        typeof arg === 'object' ? JSON.stringify(arg) : '' + arg,
      ),
    );

    return data;
  }
}

export default RedisCacheService;
