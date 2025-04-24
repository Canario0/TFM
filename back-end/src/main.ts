import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/rest/app.module';
import { LOGGER } from './context/shared/domain/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });
    app.useLogger(app.get(LOGGER));

    const config = new DocumentBuilder()
        .setTitle('Comparathor API DOCS')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
