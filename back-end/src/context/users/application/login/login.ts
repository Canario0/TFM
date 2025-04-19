import { UserEntity } from '../../domain/entities/user.entity';
import {
    USER_REPOSITORY,
    UserRepository,
} from '../../domain/persistence/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import UnauthorizedError from 'src/context/shared/domain/errors/unauthorizedError';
import { LoginResponseDto } from './loginResponse.dto';

@Injectable()
export default class Login {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async run(dto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.getUser(dto.username);
        const token = await user.login(dto.password);
        return new LoginResponseDto(token);
    }

    private async getUser(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findAll({ username });
        if (user.length === 0) {
            throw new UnauthorizedError('Invalid username or password');
        }
        return user[0];
    }
}
