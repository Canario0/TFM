import { Db } from 'mongodb';
import { MigrationInterface } from 'mongo-migrate-ts';

export class Migration1745516663992 implements MigrationInterface {
    public async up(db: Db): Promise<void | never> {
        await db.createCollection('blacklist');
        await db.createIndex(
            'blacklist',
            { expiresAt: 1 },
            { expireAfterSeconds: 0 },
        );
    }

    public async down(db: Db): Promise<void | never> {
        await db.dropCollection('blacklist');
    }
}
