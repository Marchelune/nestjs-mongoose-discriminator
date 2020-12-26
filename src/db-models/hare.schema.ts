import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class HareModel {
    @Prop({ type: [String] })
    mostAppreciatedVegetables!: string[];
}

export const HareSchema = SchemaFactory.createForClass(HareModel);
