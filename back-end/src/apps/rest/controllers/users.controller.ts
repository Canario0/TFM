import {
    Body,
    Controller,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Login from 'src/context/users/application/login/login';
import { LoginDto } from 'src/context/users/application/login/login.dto';
import { LoginResponseDto } from 'src/context/users/application/login/loginResponse.dto';
import RegisterUser from 'src/context/users/application/registerUser/registerUser';
import { RegisterUserDto } from 'src/context/users/application/registerUser/registerUser.dto';
import { UserDto } from 'src/context/users/application/user.dto';
import { TokenInfo } from '../decorators/tokenInfo.decorator';
import Logout from 'src/context/users/application/logout/logout';
import PromoteUser from 'src/context/users/application/promote/promote';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { Auth } from '../decorators/auth.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly registerUser: RegisterUser,
        private readonly loginService: Login,
        private readonly logoutService: Logout,
        private readonly promoteUser: PromoteUser,
    ) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully registered.',
        type: UserDto,
    })
    @ApiResponse({
        status: 400,
        description: 'The user has not been registered.',
    })
    @ApiResponse({
        status: 409,
        description: 'The user already exists.',
    })
    register(@Body() dto: RegisterUserDto): Promise<UserDto> {
        return this.registerUser.run(dto);
    }

    @Post('/:id/promote')
    @HttpCode(200)
    @Auth(UserRole.ADMIN)
    @ApiOperation({ summary: 'Promote a user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully promoted.',
    })
    @ApiResponse({
        status: 400,
        description: 'The user has not been promoted.',
    })
    @ApiResponse({
        status: 404,
        description: 'The user does not exist.',
    })
    async promote(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.promoteUser.run(id);
    }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in.',
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'The user has not been logged in.',
    })
    login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.loginService.run(dto);
    }

    @Post('/logout')
    @HttpCode(200)
    @ApiOperation({ summary: 'Logout a user' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged out.',
    })
    async logout(
        @TokenInfo() tokenInfo: { jti: string; exp: number } | undefined,
    ): Promise<void> {
        if (tokenInfo && tokenInfo.exp && tokenInfo.jti) {
            await this.logoutService.run(tokenInfo.jti, tokenInfo.exp);
        }
    }
}
