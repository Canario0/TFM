import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, FindOptions, MongoClient } from 'mongodb';
import { UserRepository } from '../../domain/persistence/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { MongoRepository } from 'src/context/shared/infrastructure/mongoDB/mongo.repository';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';

@Injectable()
export class MongoUserRepository
  extends MongoRepository<UserEntity>
  implements UserRepository
{
  constructor(
    @Inject('MONGO_CONNECTION')
    client: MongoClient,
  ) {
    super(client);
  }

  collectionName(): string {
    return 'users';
  }

  hydrate(document: DocumentPrimitives<UserEntity>): UserEntity {
    return UserEntity.fromPrimitives({ ...document, id: document._id });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.collection().findOne({ _id: id });
    if (!user) {
      return null;
    }
    return this.hydrate(user);
  }

  async findAll(
    filter: Filter<DocumentPrimitives<UserEntity>>,
    options?: FindOptions,
  ): Promise<UserEntity[]> {
    const users = await this.collection().find(filter, options).toArray();
    return users.map((user) => this.hydrate(user));
  }

  async count(filter: Filter<DocumentPrimitives<UserEntity>>): Promise<number> {
    return this.collection().countDocuments(filter);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const { id, ...userPrimitivesWithoutId } = user.toPrimitives();
    await this.collection().insertOne({
      ...userPrimitivesWithoutId,
      _id: id,
    });
    return user;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const { id, ...userPrimitives } = user.toPrimitives();
    await this.collection().updateOne(
      { _id: id },
      { $set: { ...userPrimitives } },
    );
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.collection().deleteOne({ _id: id });
  }
}
