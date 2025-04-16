import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, FindOptions, MongoClient } from 'mongodb';
import { UserRepository } from '../../domain/persistence/user.repository';
import { User } from '../../domain/entities/user.entity';
import { MongoRepository } from 'src/context/shared/infrastructure/mongoDB/mongo.repository';
import { DocumentPrimitives } from 'src/context/shared/infrastructure/mongoDB/types/documentPrimitives';

@Injectable()
export class MongoUserRepository
  extends MongoRepository<User>
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

  async findById(id: string): Promise<User | null> {
    const user = await this.collection().findOne({ _id: id });
    if (!user) {
      return null;
    }
    return User.fromPrimitives({ ...user, id: user._id });
  }

  async findAll(
    filter: Filter<DocumentPrimitives<User>>,
    options?: FindOptions,
  ): Promise<User[]> {
    const users = await this.collection().find(filter, options).toArray();
    return users.map((user) =>
      User.fromPrimitives({
        ...user,
        id: user._id,
      }),
    );
  }
  async count(filter: Filter<DocumentPrimitives<User>>): Promise<number> {
    return this.collection().countDocuments(filter);
  }

  async create(user: User): Promise<User> {
    const { id, ...userPrimitivesWithoutId } = user.toPrimitives();
    await this.collection().insertOne({
      ...userPrimitivesWithoutId,
      _id: id,
    });
    return user;
  }

  async update(user: User): Promise<User> {
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
