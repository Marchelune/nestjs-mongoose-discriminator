import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ForestModel {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    location!: string;

    @Prop({ required: true, type: [{}] })
    animals!: unknown[];
}

export const ForestSchema = SchemaFactory.createForClass(ForestModel);
export type ForestDocument = ForestModel & Document;
