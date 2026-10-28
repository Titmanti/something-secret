import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisFactory } from '@/config/factories/index.js';
import { GlobalConfigs } from '@/config/interfaces/index.js';
import { Redis } from 'ioredis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    { 
        provide: REDIS_CLIENT, inject: [ConfigService],
        useFactory: (configService: ConfigService<GlobalConfigs>) => {
            const logger = new Logger('RedisModule');
            const options = redisFactory(configService);

            const client = new Redis(options);

            client.on('connect', () => logger.log('Successfully connected to Redis'));
            client.on('error', (err) => logger.error('Redis connection error:', err));

        return client;
      },
    }
  ]
})
export class RedisModule {}