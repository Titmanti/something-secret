import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module.js';
import { CoreModule } from './core/index.js';

@Module({
  imports: [ConfigModule, CoreModule],
})
export class AppModule {}
