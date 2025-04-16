import { Filter, FindOptions } from 'mongodb';
import { UserEntity } from '../entities/user.entity';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  // TODO: replace all references to DocumentPrimitives<User> with User
  // and implement a proper criteria pattern
  findAll(
    filter: Filter<DocumentPrimitives<UserEntity>>,
    options?: FindOptions,
  ): Promise<UserEntity[]>;
  count(filter: Filter<DocumentPrimitives<UserEntity>>): Promise<number>;
  create(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
