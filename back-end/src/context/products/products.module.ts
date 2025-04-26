import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PRODUCT_REPOSITORY } from './domain/persistence/product.repository';
import { MongoProductRepository } from './infrastructure/mongoDB/mongoProduct.repository';
import { FindAllProducts } from './application/findAll/findAllCategories';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: MongoProductRepository,
        },
        FindAllProducts,
    ],
    exports: [FindAllProducts],
})
export class ProductsModule {}
