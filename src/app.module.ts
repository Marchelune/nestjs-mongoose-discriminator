import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForestModel, ForestSchema } from './db-models';
import { ForestController } from './forest/forest.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: ForestModel.name, schema: ForestSchema }])],
    controllers: [ForestController],
    providers: [],
})
export class AppModule {}
