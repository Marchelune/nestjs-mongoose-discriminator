import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForestModel, ForestSchema } from './db-models';
import { ForestController } from './forest/forest.controller';
import { InMemoryMongoService } from './in-memory-mongo/in-memory-mongo.service';
import { InMemoryMongoModule } from './in-memory-mongo/in-memory-mongo.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ForestModel.name, schema: ForestSchema }]),
        MongooseModule.forRootAsync({
            useFactory: async (mongoInMemory: InMemoryMongoService) => {
                const connString = await mongoInMemory.getMongoConnString();
                return {
                    uri: connString,
                };
            },
            inject: [InMemoryMongoService],
            imports: [InMemoryMongoModule],
        }),
    ],
    controllers: [ForestController],
    providers: [InMemoryMongoService],
})
export class AppModule {}
