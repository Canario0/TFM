import { Inject, Injectable } from '@nestjs/common';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ProductSummaryDto } from './productSummary.dto';
import { Filter } from 'mongodb';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class FindAllProducts {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(
        filter?: Filter<DocumentPrimitives<ProductEntity>>,
    ): Promise<ProductSummaryDto[]> {
        const products = await this.productRepository.findAll(filter ?? {});
        return products.map(ProductSummaryDto.fromEntity);
    }
}
