import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { GlobalConfigs, DatabaseConfig } from '../interfaces/index.js';

export function databaseFactory(
  configService: ConfigService<GlobalConfigs>,
): DatabaseConfig {
  const config = configService.get('database');
  const logger = new Logger(databaseFactory.name);

  if (!config) {
    throw new Error('Database configuration is missing');
  }

  // Do not serialize connection options: they contain credentials.
  logger.debug('Database configuration loaded');

  return config;
}
