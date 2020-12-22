import { Module } from '@nestjs/common';
import { InMemoryMongoService } from './in-memory-mongo.service';

@Module({
    providers: [InMemoryMongoService],
    exports: [InMemoryMongoService],
})
export class InMemoryMongoModule {}
