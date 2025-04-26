import { Inject, Injectable } from '@nestjs/common';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ProductDto } from '../product.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';

@Injectable()
export class FindProductById {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(id: string): Promise<ProductDto> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        return ProductDto.fromEntity(product);
    }
}
