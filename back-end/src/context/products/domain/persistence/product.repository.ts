import { Filter, FindOptions } from 'mongodb';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { ProductEntity } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol('ProductRepository');

export interface ProductRepository {
    findAll(
        filter: Filter<DocumentPrimitives<ProductEntity>>,
        options?: FindOptions,
    ): Promise<ProductEntity[]>;

    findById(id: string): Promise<ProductEntity | null>;

    create(product: ProductEntity): Promise<ProductEntity>;
}
