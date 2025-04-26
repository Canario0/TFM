import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    UserRepository,
} from '../../domain/persistence/user.repository';
import { UserDto } from '../user.dto';

@Injectable()
export class FindAllUsers {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async run(): Promise<UserDto[]> {
        const users = await this.userRepository.findAll({});
        return users.map(UserDto.fromEntity);
    }
}
