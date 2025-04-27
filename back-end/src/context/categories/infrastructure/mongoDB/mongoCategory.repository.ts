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
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/persistence/category.repository';
import AlreadyExistsError from 'src/context/shared/domain/errors/alreadyExistsError';

@Injectable()
export class MongoCategoryRepository
    extends MongoRepository<CategoryEntity>
    implements CategoryRepository
{
    constructor(
        @Inject('MONGO_CONNECTION')
        client: MongoClient,
    ) {
        super(client);
    }

    protected collectionName(): string {
        return 'categories';
    }

    protected hydrate(
        document: DocumentPrimitives<CategoryEntity>,
    ): CategoryEntity {
        return CategoryEntity.fromPrimitives({ ...document, id: document._id });
    }

    protected collection(): Collection<DocumentPrimitives<CategoryEntity>> {
        return this.client
            .db()
            .collection<
                DocumentPrimitives<CategoryEntity>
            >(this.collectionName());
    }

    async findById(id: string): Promise<CategoryEntity | null> {
        const category = await this.collection().findOne({
            _id: id,
        });
        return category ? this.hydrate(category) : null;
    }

    async findAll(
        filter: Filter<DocumentPrimitives<CategoryEntity>>,
        options?: FindOptions,
    ): Promise<CategoryEntity[]> {
        const categories = await this.collection()
            .find(filter, options)
            .toArray();
        return categories.map(this.hydrate);
    }

    async create(category: CategoryEntity): Promise<CategoryEntity> {
        const { id, ...categoryPrimitivesWithoutId } = category.toPrimitives();
        try {
            await this.collection().insertOne({
                ...categoryPrimitivesWithoutId,
                _id: id,
            } as DocumentPrimitives<CategoryEntity>);
            category.commit();
            return category;
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                throw new AlreadyExistsError(
                    'La categoría con este nombre ya existe',
                );
            }
            throw error;
        }
    }
}
