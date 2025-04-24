import { BlacklistEntity } from '../entities/blacklist';

export const BLACKLIST_REPOSITORY = Symbol('BlacklistRepository');

export interface BlacklistRepository {
    findByJti(jti: string): Promise<BlacklistEntity | null>;
    upsert(blacklist: BlacklistEntity): Promise<BlacklistEntity>;
}
