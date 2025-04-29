import { Module } from '@nestjs/common';
import { SharedModule } from 'src/context/shared/shared.module';
import { UsersController } from './controllers/users.controller';
import { UsersModule } from 'src/context/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { adminConfig } from './configs/admin.config';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandler } from './error.handler';
import { CategoriesModule } from 'src/context/categories/categories.module';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsModule } from 'src/context/products/products.module';
import { ProductsController } from './controllers/products.controller';
import { ComparisonsModule } from 'src/context/comparisons/comparisons.module';
import { ComparisonsController } from './controllers/comparisons.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, adminConfig],
        }),
        SharedModule,
        UsersModule,
        CategoriesModule,
        ProductsModule,
        ComparisonsModule,
    ],
    controllers: [
        UsersController,
        CategoriesController,
        ProductsController,
        ComparisonsController,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorHandler,
        },
    ],
})
export class AppModule {}
