import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1745783820313 implements MigrationInterface {
    public async up(db: Db): Promise<void | never> {
        await db.createCollection('comparisons');
        await db.createIndex(
            'comparisons',
            { ownerId: 1, name: 1 },
            { unique: true },
        );
    }

    public async down(db: Db): Promise<void | never> {}
}
