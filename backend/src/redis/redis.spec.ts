import RedisCacheService from './redis.service';

describe('run', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  it('should send commands to the Redis server and return the result', async () => {
    const mockRunCommand = jest.spyOn(RedisCacheService, 'run');
    const mockData = 'result';

    mockRunCommand.mockResolvedValue(mockData);

    const result = await RedisCacheService.run('GET', 'key');

    expect(mockRunCommand).toHaveBeenCalledTimes(1);
    expect(mockRunCommand).toHaveBeenCalledWith('GET', 'key');
    expect(result).toBe(mockData);
  });
});
