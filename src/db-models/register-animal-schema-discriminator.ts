import { Schema } from 'mongoose';
import { AnimalKind } from 'src/domain-models';
import { HareSchema } from './hare.schema';
import { UnicornSchema } from './unicorn.schema';
import { WolfSchema } from './wolf.schema';

/**
 * This is the magic trick.
 */
export function registerAnimalSchemaDiscriminator(animalsArraySchema: Schema.Types.DocumentArray): void {
    animalsArraySchema.discriminator(AnimalKind.Hare, HareSchema);
    animalsArraySchema.discriminator(AnimalKind.Wolf, WolfSchema);
    animalsArraySchema.discriminator(AnimalKind.Unicorn, UnicornSchema);
}
