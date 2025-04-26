import { Inject, Injectable } from '@nestjs/common';
import {
    Collection,
    Filter,
    FindOptions,
    MongoClient,
    MongoError,
} from 'mongodb';
import { MongoRepository } from 'src/context/shared/infrastructure/mongoDB/mongo.repository';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/persistence/product.repository';
import AlreadyExistsError from 'src/context/shared/domain/errors/alreadyExistsError';

@Injectable()
export class MongoProductRepository
    extends MongoRepository<ProductEntity>
    implements ProductRepository
{
    constructor(
        @Inject('MONGO_CONNECTION')
        client: MongoClient,
    ) {
        super(client);
    }

    protected collectionName(): string {
        return 'products';
    }

    protected hydrate(
        document: DocumentPrimitives<ProductEntity>,
    ): ProductEntity {
        return ProductEntity.fromPrimitives({ ...document, id: document._id });
    }

    protected collection(): Collection<DocumentPrimitives<ProductEntity>> {
        return this.client
            .db()
            .collection<
                DocumentPrimitives<ProductEntity>
            >(this.collectionName());
    }

    async findAll(
        filter: Filter<DocumentPrimitives<ProductEntity>>,
        options?: FindOptions,
    ): Promise<ProductEntity[]> {
        const products = await this.collection()
            .find(filter, options)
            .toArray();
        return products.map(this.hydrate);
    }

    async findById(id: string): Promise<ProductEntity | null> {
        const product = await this.collection().findOne({ _id: id });
        return product ? this.hydrate(product) : null;
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        const { id, ...productPrimitivesWithoutId } = product.toPrimitives();
        try {
            await this.collection().insertOne({
                ...productPrimitivesWithoutId,
                _id: id,
            } as DocumentPrimitives<ProductEntity>);
            return product;
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                throw new AlreadyExistsError(
                    'El producto con ese nombre y categoría ya existe',
                );
            }
            throw error;
        }
    }
}
