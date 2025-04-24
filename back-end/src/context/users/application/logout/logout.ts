import { BlacklistEntity } from '../../domain/entities/blacklist';
import {
    BLACKLIST_REPOSITORY,
    BlacklistRepository,
} from '../../domain/persistence/blacklist.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class Logout {
    constructor(
        @Inject(BLACKLIST_REPOSITORY)
        private readonly blacklistRepository: BlacklistRepository,
    ) {}

    async run(jti: string, exp: number): Promise<void> {
        const blacklist = BlacklistEntity.expireToken(jti, exp);
        await this.blacklistRepository.upsert(blacklist);
    }
}
