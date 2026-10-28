import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { databaseEnv, redisEnv } from './env/index.js';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [databaseEnv, redisEnv],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
