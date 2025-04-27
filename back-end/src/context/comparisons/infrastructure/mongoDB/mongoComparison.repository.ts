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
import AlreadyExistsError from 'src/context/shared/domain/errors/alreadyExistsError';
import ConcurrencyError from 'src/context/shared/domain/errors/concurrencyError';
import { ComparisonEntity } from '../../domain/entities/comparison.entity';
import { ComparisonRepository } from '../../domain/persistence/comparison.repository';

@Injectable()
export class MongoComparisonRepository
    extends MongoRepository<ComparisonEntity>
    implements ComparisonRepository
{
    constructor(
        @Inject('MONGO_CONNECTION')
        client: MongoClient,
    ) {
        super(client);
    }

    protected collectionName(): string {
        return 'comparisons';
    }

    protected hydrate(
        document: DocumentPrimitives<ComparisonEntity>,
    ): ComparisonEntity {
        return ComparisonEntity.fromPrimitives({
            ...document,
            id: document._id,
        });
    }

    protected collection(): Collection<DocumentPrimitives<ComparisonEntity>> {
        return this.client
            .db()
            .collection<
                DocumentPrimitives<ComparisonEntity>
            >(this.collectionName());
    }

    async findAll(
        filter: Filter<DocumentPrimitives<ComparisonEntity>>,
        ownerId: string,
        options?: FindOptions,
    ): Promise<ComparisonEntity[]> {
        const comparisons = await this.collection()
            .find({ ownerId, ...filter }, options)
            .toArray();
        return comparisons.map(this.hydrate);
    }

    async findById(
        id: string,
        ownerId: string,
    ): Promise<ComparisonEntity | null> {
        const comparison = await this.collection().findOne({
            ownerId,
            _id: id,
        });
        return comparison ? this.hydrate(comparison) : null;
    }

    async create(comparison: ComparisonEntity): Promise<ComparisonEntity> {
        const { id, ...comparisonPrimitivesWithoutId } =
            comparison.toPrimitives();
        try {
            await this.collection().insertOne({
                ...comparisonPrimitivesWithoutId,
                _id: id,
            });
            comparison.commit();
            return comparison;
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                throw new AlreadyExistsError(
                    'La comparación con ese nombre ya existe',
                );
            }
            throw error;
        }
    }

    async update(comparison: ComparisonEntity): Promise<ComparisonEntity> {
        if (!comparison.isDirty()) {
            return comparison;
        }
        const primitives = comparison.getDirtyPrimitives();
        try {
            const result = await this.collection().updateOne(
                {
                    _id: comparison.id,
                    ownerId: comparison.ownerId,
                    version: comparison.version,
                },
                {
                    $set: {
                        ...primitives,
                    },
                    $inc: { version: 1 },
                },
            );
            if (result.modifiedCount === 0) {
                throw new ConcurrencyError('La comparación ha sido modificada');
            }
            comparison.commit();
            return comparison;
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                throw new AlreadyExistsError(
                    'La comparación con ese nombre ya existe',
                );
            }
            throw error;
        }
    }

    async delete(id: string, ownerId: string): Promise<void> {
        await this.collection().deleteOne({ ownerId, _id: id });
    }
}
