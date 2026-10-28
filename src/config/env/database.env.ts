import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions as DatabaseConfig } from '@nestjs/typeorm';
import { DatabaseConfigValidator } from '../validators/index.js';
import { validateEnv } from '@/common/utils/index.js';

export const databaseEnv = registerAs<DatabaseConfig>('database', () => {
  const validatedEnv = validateEnv(process.env, DatabaseConfigValidator);

  const isDev = process.env.NODE_ENV === 'development';

  return {
    type: 'postgres',
    host: validatedEnv.DATABASE_HOST,
    port: Number(validatedEnv.DATABASE_PORT) || 5432,
    username: validatedEnv.DATABASE_USERNAME,
    password: validatedEnv.DATABASE_PASSWORD,
    database: validatedEnv.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
    logging: isDev ? ['query', 'error'] : ['error'],
    extra: {
      max: 20,
      connectionTimeoutMillis: 2000,
    },
  };
});
