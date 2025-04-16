import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1744832785850 implements MigrationInterface {
  public async up(db: Db): Promise<void | never> {
    await db.createCollection('users');
  }

  public async down(db: Db): Promise<void | never> {
  }
}
