import { randomUUID } from 'crypto';
import { UserEntity } from '../../domain/entities/user.entity';
import {
    USER_REPOSITORY,
    UserRepository,
} from '../../domain/persistence/user.repository';
import { UserDto } from '../user.dto';
import { RegisterUserDto } from './registerUser.dto';
import { Inject, Injectable } from '@nestjs/common';
import AlreadyExistsError from 'src/context/shared/domain/errors/alreadyExistsError';

@Injectable()
export default class RegisterUser {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async run(dto: RegisterUserDto): Promise<UserDto> {
        await this.checkIfUserExists(dto.username);
        const user = await UserEntity.createUser(
            randomUUID(),
            dto.username,
            dto.password,
        );
        await this.userRepository.create(user);
        return UserDto.fromEntity(user);
    }

    private async checkIfUserExists(username: string): Promise<void> {
        const user = await this.userRepository.count({ username });
        if (user) {
            throw new AlreadyExistsError('Username is already in use');
        }
    }
}
