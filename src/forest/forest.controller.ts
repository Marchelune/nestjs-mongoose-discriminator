import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Error as MongooseError, Model } from 'mongoose';
import { ForestDocument, ForestModel } from 'src/db-models';

export class CreateForestDto {
    @ApiProperty()
    forestName!: string;
}

class AddAnimalDto {
    @ApiProperty()
    kind!: string;

    @ApiProperty()
    numberOfLegs!: number;
}

@Controller('forest')
export class ForestController {
    private readonly logger = new Logger(ForestController.name);
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
    public async addAnimal(@Param('forestName') forestName: string, @Body() animal: AddAnimalDto): Promise<void> {
        const forest = await this.findForestOrThrow(forestName);

        // here there is no domain logic but in a real we would potentially
        // add fields to animal or modify input data.

        forest.animals.push(animal);

        try {
            await forest.save();
        } catch (error) {
            if (error instanceof MongooseError && error.name === 'ValidationError') {
                this.logger.warn(`The animal is invalid: ${error.message}`);
                throw new BadRequestException(error.message);
            }

            throw error;
        }
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
