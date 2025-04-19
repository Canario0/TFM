import { Filter, FindOptions } from 'mongodb';
import { CategoryEntity } from '../entities/category.entity';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';

export const CATEGORY_REPOSITORY = Symbol('CategoryRepository');

export interface CategoryRepository {
    findById(id: string): Promise<CategoryEntity | null>;
    findAll(
        filter: Filter<DocumentPrimitives<CategoryEntity>>,
        options?: FindOptions,
    ): Promise<CategoryEntity[]>;
    //   count(filter: Filter<DocumentPrimitives<CategoryEntity>>): Promise<number>;
    create(category: CategoryEntity): Promise<CategoryEntity>;
    //   update(category: CategoryEntity): Promise<CategoryEntity>;
    //   delete(id: string): Promise<void>;
}
