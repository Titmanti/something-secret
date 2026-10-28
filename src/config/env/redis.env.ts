import { registerAs } from '@nestjs/config';
import { RedisConfig } from '../interfaces/index.js';
import { validateEnv } from '@/common/utils/index.js';
import { RedisConfigValidator } from '../validators/index.js';

export const redisEnv = registerAs('redis', (): RedisConfig => {
  const validatedEnv = validateEnv(process.env, RedisConfigValidator);

  return {
    host: validatedEnv.REDIS_HOST,
    port: validatedEnv.REDIS_PORT,
    username: validatedEnv.REDIS_USERNAME,
    password: validatedEnv.REDIS_PASSWORD,
    retryStrategy: (times: number) => {
      return Math.min(times * 50, 2000);
    },
  };
});
