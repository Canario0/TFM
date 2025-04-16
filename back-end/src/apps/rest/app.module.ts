import { Module } from '@nestjs/common';
import { SharedModule } from 'src/context/shared/shared.module';
import { UsersController } from './controllers/users.controller';
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
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
  ],
})
export class AppModule {}
