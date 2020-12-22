import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForestDocument, ForestModel } from 'src/db-models';

@Controller('forest')
export class ForestController {
    /**
     * Note: For the sake of simplifying this example, we just inject directly the
     * mongoose layer in our controller.
     * For a real application, use a service instead ;) !
     */
    constructor(@InjectModel(ForestModel.name) private readonly forestModel: Model<ForestDocument>) {}

    @Post(':{forestName}/animals')
    public async addAnimal(@Param('forestName') forestName: string, @Body() animal: unknown): Promise<void> {
        const forest = await this.forestModel.findOne({ name: forestName });
        if (!forest) {
            throw new NotFoundException(`No ${forestName} exists`);
        }

        forest.animals.push(animal);

        await forest.save();
    }

    @Get(':{forestName}/animals')
    public async getAnimals(@Param('forestName') forestName: string): Promise<unknown[]> {
        const forest = await this.forestModel.findOne({ name: forestName });
        if (!forest) {
            throw new NotFoundException(`No ${forestName} exists`);
        }

        return forest.toObject().animals;
    }
}
