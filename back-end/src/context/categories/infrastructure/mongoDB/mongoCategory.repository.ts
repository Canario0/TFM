import { Inject, Injectable } from '@nestjs/common';
import { Filter, FindOptions, MongoClient, MongoError } from 'mongodb';
import { MongoRepository } from 'src/context/shared/infrastructure/mongoDB/mongo.repository';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/persistence/category.respository';
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

    collectionName(): string {
        return 'categories';
    }

    hydrate(document: DocumentPrimitives<CategoryEntity>): CategoryEntity {
        return CategoryEntity.fromPrimitives({ ...document, id: document._id });
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
