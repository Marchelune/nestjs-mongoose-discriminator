import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class WolfModel {
    @Prop({ required: true })
    canineLengthInCm!: number;
}

export const WolfSchema = SchemaFactory.createForClass(WolfModel);
