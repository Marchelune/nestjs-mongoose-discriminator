import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
import { ForestController } from './forest/forest.controller';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // In order to close the in memory mongo instance
    app.enableShutdownHooks();

    setupOpenApiUi(app);
    await seedDatabase(app);

    await app.listen(3000);
}

void bootstrap();

async function seedDatabase(app: INestApplication) {
    const controller = app.get(ForestController);
    await controller.addForest({ forestName: 'broceliande' });
}

function setupOpenApiUi(app: INestApplication) {
    const options = new DocumentBuilder().setTitle(name).setDescription(description).setVersion(version).build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('open-api', app, document);
}
