import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { PRODUCT_REPOSITORY } from './domain/persistence/product.repository';
import { MongoProductRepository } from './infrastructure/mongoDB/mongoProduct.repository';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: MongoProductRepository,
        },
    ],
    exports: [],
})
export class ProductsModule {}
