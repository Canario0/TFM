import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ProductDto } from '../product.dto';
import { CreateProductDto } from './createProduct.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductSubCategory } from '../../domain/entities/productSubCategory.entity';

@Injectable()
export class CreateProduct {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(productRaw: CreateProductDto): Promise<ProductDto> {
        const product = ProductEntity.createProduct({
            id: randomUUID(),
            name: productRaw.name,
            category: productRaw.category,
            icon: productRaw.icon,
            maker: productRaw.maker,
            brand: productRaw.brand,
            model: productRaw.model,
            price: productRaw.price,
            description: productRaw.description,
        });
        productRaw.subCategories.forEach((subCategory) => {
            product.addSubCategory(
                ProductSubCategory.createSubCategory(
                    subCategory.name,
                    subCategory.metadata,
                    subCategory.icon,
                ),
            );
        });
        await this.productRepository.create(product);
        return ProductDto.fromEntity(product);
    }
}
