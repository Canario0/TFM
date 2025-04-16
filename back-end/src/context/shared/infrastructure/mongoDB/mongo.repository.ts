import { Collection, MongoClient } from 'mongodb';
import BaseEntity from '../../domain/entities/baseEntity';
import { DocumentPrimitives } from './types/documentPrimitives';

export abstract class MongoRepository<T extends BaseEntity> {
  constructor(private readonly client: MongoClient) {}

  protected abstract collectionName(): string;

  protected collection(): Collection<DocumentPrimitives<T>> {
    return this.client
      .db()
      .collection<DocumentPrimitives<T>>(this.collectionName());
  }
}
