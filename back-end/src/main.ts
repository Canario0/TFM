import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/rest/app.module';
import { LOGGER } from './context/shared/domain/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LOGGER));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
