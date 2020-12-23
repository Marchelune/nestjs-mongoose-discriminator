import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnimalKind } from 'src/domain-models';

// eslint-disable-next-line @typescript-eslint/naming-convention
@Schema({ _id: false, discriminatorKey: 'kind' })
class AnimalModel {
    @Prop({ type: String, required: true, enum: Object.values(AnimalKind) })
    kind!: AnimalKind;

    @Prop({ required: true })
    numberOfLegs!: number;
}

export const AnimalSchema = SchemaFactory.createForClass(AnimalModel);
