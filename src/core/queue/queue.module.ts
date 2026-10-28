import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisFactory } from '@/config/factories/index.js';
import type { GlobalConfigs } from '@/config/interfaces/index.js';
import { QUEUE } from './constants/index.js';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfigs>) => ({
        connection: redisFactory(configService),
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
        },
      }),
    }),
    BullModule.registerQueue({ name: QUEUE.EMAIL }),
  ],
})
export class QueueModule {}
