import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedModule } from 'src/context/shared/shared.module';
import { AppController } from './controllers/app.controller';
import { UsersModule } from 'src/context/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { adminConfig } from './configs/admin.config';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './error.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, adminConfig],
    }),
    SharedModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
  ],
})
export class AppModule {}
