import { ConfigService } from '@nestjs/config';
import type { GlobalConfigs, RedisConfig } from '../interfaces/index.js';
import { Logger } from '@nestjs/common';

export function redisFactory(
  configService: ConfigService<GlobalConfigs>,
): RedisConfig {
  const config = configService.get('redis');
  const logger = new Logger(redisFactory.name);

  if (!config) {
    throw new Error('Redis configuration is missing');
  }

  logger.debug(`Redis configuration loaded: ${JSON.stringify(config)}`);

  return {
    config: {
      ...config,
    },
  };
}
