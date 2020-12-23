import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AnimalSchema } from './animal.schema';
import { registerAnimalSchemaDiscriminator } from './register-animal-schema-discriminator';

@Schema()
export class ForestModel {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, type: [AnimalSchema] })
    animals!: unknown[];
}

export const ForestSchema = SchemaFactory.createForClass(ForestModel);

const animalsArraySchema = ForestSchema.path('animals') as MongooseSchema.Types.DocumentArray;
registerAnimalSchemaDiscriminator(animalsArraySchema);

export type ForestDocument = ForestModel & Document;
