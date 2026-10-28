import { ConfigService } from '@nestjs/config';
import type { GlobalConfigs, DatabaseConfig } from '../interfaces/index.js';
import { Logger } from '@nestjs/common';

export function databaseFactory(
  configService: ConfigService<GlobalConfigs>,
): DatabaseConfig {
  const config = configService.get('database');
  const logger = new Logger(databaseFactory.name);

  if (!config) {
    throw new Error('Database configuration is missing');
  }

  logger.debug(`Database configuration loaded: ${JSON.stringify(config)}`);

  return config;
}
