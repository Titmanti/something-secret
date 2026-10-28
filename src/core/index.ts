import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module.js";
import { QueueModule } from "./queue/queue.module.js";
import { RedisModule } from "./redis/redis.module.js";

@Module({
    imports: [DatabaseModule, QueueModule, RedisModule],
    exports: [DatabaseModule, QueueModule, RedisModule]
})
export class CoreModule {}