import { Collection, MongoClient } from 'mongodb';
import AggregateRoot from '../../domain/entities/aggregateRoot';

export abstract class MongoRepository<T extends AggregateRoot> {
    constructor(protected readonly client: MongoClient) {}

    protected abstract collectionName(): string;

    protected abstract hydrate(document: unknown): T;

    protected abstract collection(): Collection<any>;
}
