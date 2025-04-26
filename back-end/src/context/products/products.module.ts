import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PRODUCT_REPOSITORY } from './domain/persistence/product.repository';
import { MongoProductRepository } from './infrastructure/mongoDB/mongoProduct.repository';
import { FindAllProducts } from './application/findAll/findAllCategories';
import { FindProductById } from './application/findById/findProductById';
import { CreateProduct } from './application/create/create';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: MongoProductRepository,
        },
        FindAllProducts,
        FindProductById,
        CreateProduct,
    ],
    exports: [FindAllProducts, FindProductById, CreateProduct],
})
export class ProductsModule {}
