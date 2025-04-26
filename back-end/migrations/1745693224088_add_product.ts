import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1745693224088 implements MigrationInterface {
    public async up(db: Db): Promise<void | never> {
        await db.createCollection('products');
        await db.createIndex(
            'products',
            { name: 1, category: 1 },
            { unique: true },
        );
    }

    public async down(db: Db): Promise<void | never> {}
}
