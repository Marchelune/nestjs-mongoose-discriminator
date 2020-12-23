import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalSchema } from './animal.schema';

@Schema()
export class ForestModel {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, type: [AnimalSchema] })
    animals!: unknown[];
}

export const ForestSchema = SchemaFactory.createForClass(ForestModel);
export type ForestDocument = ForestModel & Document;
