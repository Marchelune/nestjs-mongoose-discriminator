import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class UnicornModel {
    @Prop({ required: true })
    hornColor!: string;
}

export const UnicornSchema = SchemaFactory.createForClass(UnicornModel);
