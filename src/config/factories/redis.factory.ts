import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GlobalConfigs, RedisConfig } from '../interfaces/index.js';

export function redisFactory(
  configService: ConfigService<GlobalConfigs>,
): RedisConfig {
  const config = configService.get('redis');
  const logger = new Logger(redisFactory.name);

  if (!config) {
    throw new Error('Redis configuration is missing');
  }

  // Never log credentials from configuration.
  logger.debug('Redis configuration loaded');

  return { ...config };
}
