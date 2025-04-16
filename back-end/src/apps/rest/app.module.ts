import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedModule } from 'src/context/shared/shared.module';
import { AppController } from './controllers/app.controller';
import { UsersModule } from 'src/context/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { adminConfig } from './configs/admin.config';

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
  providers: [AppService],
})
export class AppModule {}
