import { BlacklistEntity } from '../../domain/entities/blacklist';
import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    UserRepository,
} from '../../domain/persistence/user.repository';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';

@Injectable()
export default class PromoteUser {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async run(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }
        if (user.isAdmin()) {
            return;
        }
        user.promote();
        await this.userRepository.update(user);
    }
}
