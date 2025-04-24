import {
    BLACKLIST_REPOSITORY,
    BlacklistRepository,
} from '../../domain/persistence/blacklist.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class CheckBlacklist {
    constructor(
        @Inject(BLACKLIST_REPOSITORY)
        private readonly blacklistRepository: BlacklistRepository,
    ) {}

    async run(jti: string): Promise<boolean> {
        const blacklist = await this.blacklistRepository.findByJti(jti);
        return blacklist ? true : false;
    }
}
