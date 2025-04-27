import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { MongoRepository } from '../../../shared/infrastructure/mongoDB/mongo.repository';
import { DocumentPrimitives } from '../../../shared/infrastructure/mongoDB/types/documentPrimitives';
import { BlacklistEntity } from '../../domain/entities/blacklist';
import { BlacklistRepository } from '../../domain/persistence/blacklist.repository';

type BlacklistDocument = { jti: string; expiresAt: Date; version: number };

@Injectable()
export class MongoBlacklistRepository
    extends MongoRepository<BlacklistEntity>
    implements BlacklistRepository
{
    constructor(
        @Inject('MONGO_CONNECTION')
        client: MongoClient,
    ) {
        super(client);
    }

    protected collectionName(): string {
        return 'blacklist';
    }

    protected hydrate(document: BlacklistDocument): BlacklistEntity {
        return BlacklistEntity.fromPrimitives({
            jti: document.jti,
            expiresAt: document.expiresAt.getTime(),
            version: document.version,
        });
    }

    protected collection(): Collection<BlacklistDocument> {
        return this.client
            .db()
            .collection<BlacklistDocument>(this.collectionName());
    }

    async findByJti(jti: string): Promise<BlacklistEntity | null> {
        const blacklist = await this.collection().findOne<BlacklistDocument>({
            jti,
        });
        return blacklist ? this.hydrate(blacklist) : null;
    }

    async upsert(blacklist: BlacklistEntity): Promise<BlacklistEntity> {
        const primitives = blacklist.toPrimitives();
        await this.collection().updateOne(
            { jti: primitives.jti },
            {
                $set: {
                    jti: primitives.jti,
                    expiresAt: new Date(primitives.expiresAt),
                },
            },
            { upsert: true },
        );
        return blacklist;
    }
}
