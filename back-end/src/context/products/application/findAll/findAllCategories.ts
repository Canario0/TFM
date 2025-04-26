import { Inject, Injectable } from '@nestjs/common';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ProductSummaryDto } from './productSummary.dto';

@Injectable()
export class FindAllProducts {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(): Promise<ProductSummaryDto[]> {
        const products = await this.productRepository.findAll({});
        return products.map(ProductSummaryDto.fromEntity);
    }
}
