import { Collection, MongoClient } from 'mongodb';
import BaseEntity from '../../domain/entities/baseEntity';

export abstract class MongoRepository<T extends BaseEntity> {
    constructor(protected readonly client: MongoClient) {}

    protected abstract collectionName(): string;

    protected abstract hydrate(document: unknown): T;

    protected abstract collection(): Collection<any>;
}
