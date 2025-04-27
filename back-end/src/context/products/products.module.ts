import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PRODUCT_REPOSITORY } from './domain/persistence/product.repository';
import { MongoProductRepository } from './infrastructure/mongoDB/mongoProduct.repository';
import { FindAllProducts } from './application/findAll/findAllCategories';
import { FindProductById } from './application/findById/findProductById';
import { CreateProduct } from './application/create/create';
import { ReviewProduct } from './application/review/reviewProduct';

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
        ReviewProduct,
    ],
    exports: [FindAllProducts, FindProductById, CreateProduct, ReviewProduct],
})
export class ProductsModule {}
