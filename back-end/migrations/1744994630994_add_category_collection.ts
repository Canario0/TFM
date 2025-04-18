import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1744994630994 implements MigrationInterface {
  public async up(db: Db): Promise<void | never> {
    await db.createCollection('categories');
    await db.createIndex('categories', { name: 1 }, { unique: true });
  }

  public async down(db: Db): Promise<void | never> {}
}
