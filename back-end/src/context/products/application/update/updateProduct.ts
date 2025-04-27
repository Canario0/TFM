import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ProductDto } from '../product.dto';
import { ProductSubCategory } from '../../domain/entities/productSubCategory.entity';
import { UpdateProductDto } from './update.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';

@Injectable()
export class UpdateProduct {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(
        productId: string,
        productRaw: UpdateProductDto,
    ): Promise<ProductDto> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundError('Producto no encontrado');
        }
        if (productRaw.name) product.updateName(productRaw.name);
        if (productRaw.maker) product.updateMaker(productRaw.maker);
        if (productRaw.brand) product.updateBrand(productRaw.brand);
        if (productRaw.model) product.updateModel(productRaw.model);
        if (productRaw.price) product.updatePrice(productRaw.price);
        if (productRaw.description)
            product.updateDescription(productRaw.description);
        if (productRaw.subCategories) {
            product.updateSubCategory(
                productRaw.subCategories.map((subCategory) =>
                    ProductSubCategory.createSubCategory(
                        subCategory.name,
                        subCategory.metadata,
                        subCategory.icon,
                    ),
                ),
            );
        }
        await this.productRepository.update(product);
        return ProductDto.fromEntity(product);
    }
}
