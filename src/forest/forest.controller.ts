import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { ForestDocument, ForestModel } from 'src/db-models';

export class CreateForestDto {
    @ApiProperty()
    forestName!: string;
}

@Controller('forest')
export class ForestController {
    /**
     * Note: For the sake of simplifying this example, we just inject directly the
     * mongoose layer in our controller.
     * For a real application, use a service instead ;) !
     */
    constructor(@InjectModel(ForestModel.name) private readonly forestModel: Model<ForestDocument>) {}

    @Post()
    public async addForest(@Body() forest: CreateForestDto): Promise<void> {
        await this.forestModel.create({ name: forest.forestName, animals: [] });
    }

    @Put(':forestName/animals')
    public async addAnimal(@Param('forestName') forestName: string, @Body() animal: unknown): Promise<void> {
        const forest = await this.findForestOrThrow(forestName);

        forest.animals.push(animal);

        await forest.save();
    }

    @Get(':forestName')
    public async getForest(@Param('forestName') forestName: string): Promise<unknown> {
        const forest = await this.findForestOrThrow(forestName);

        return forest.toObject();
    }

    private async findForestOrThrow(forestName: string) {
        const forest = await this.forestModel.findOne({ name: forestName });
        if (!forest) {
            throw new NotFoundException(`No forest '${forestName}' exists.`);
        }

        return forest;
    }
}
