import type {
  DatabaseConfig,
  RedisConfig,
} from './index.js';

export interface GlobalConfigs {
  redis: RedisConfig;
  database: DatabaseConfig;
}
