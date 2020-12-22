import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ForestModel {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, type: [{}] })
    animals!: unknown[];
}

export const ForestSchema = SchemaFactory.createForClass(ForestModel);
export type ForestDocument = ForestModel & Document;
