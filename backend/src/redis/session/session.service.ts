import RedisCacheService from '../redis.service';

const DAY = 24 * 60 * 60 * 1e3;

class SessionService {
  static SESSION_PREFIX = 'session:';

  static TTL = DAY * 7;

  static async get(session: string) {
    if (!session) {
      return null;
    }

    const key: string = SessionService.SESSION_PREFIX + session;
    const res: string = (await RedisCacheService.run('GET', key)) as string;

    if (!res) {
      return null;
    }

    return JSON.parse(res);
  }

  static async set(session: string, data: any) {
    if (!session) {
      return null;
    }

    const key: string = SessionService.SESSION_PREFIX + session;

    const res = await RedisCacheService.run(
      'SET',
      key,
      JSON.stringify(data),
      'PX',
      SessionService.TTL,
    );

    return res;
  }

  static async delete(session: string) {
    const res = await RedisCacheService.run(
      'DEL',
      SessionService.SESSION_PREFIX + session,
    );

    return res;
  }
}

export default SessionService;
