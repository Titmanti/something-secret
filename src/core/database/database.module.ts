import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseFactory } from '@/config/factories/index.js';
import { GlobalConfigs } from '@/config/interfaces/index.js';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<GlobalConfigs>) => {
        return databaseFactory(configService)
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}