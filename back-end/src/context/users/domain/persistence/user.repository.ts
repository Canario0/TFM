import { Filter, FindOptions } from 'mongodb';
import { User } from '../entities/user.entity';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  // TODO: replace all references to DocumentPrimitives<User> with User
  // and implement a proper criteria pattern
  findAll(
    filter: Filter<DocumentPrimitives<User>>,
    options?: FindOptions,
  ): Promise<User[]>;
  count(filter: Filter<DocumentPrimitives<User>>): Promise<number>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
