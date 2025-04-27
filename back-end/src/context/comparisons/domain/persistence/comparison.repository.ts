import { Filter, FindOptions } from 'mongodb';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';
import { ComparisonEntity } from '../entities/comparison.entity';

export const COMPARISON_REPOSITORY = Symbol('ComparisonRepository');

export interface ComparisonRepository {
    findAll(
        filter: Filter<DocumentPrimitives<ComparisonEntity>>,
        ownerId: string,
        options?: FindOptions,
    ): Promise<ComparisonEntity[]>;
    findById(id: string, ownerId: string): Promise<ComparisonEntity | null>;
    create(comparison: ComparisonEntity): Promise<ComparisonEntity>;
    update(comparison: ComparisonEntity): Promise<ComparisonEntity>;
    delete(id: string, ownerId: string): Promise<void>;
}
