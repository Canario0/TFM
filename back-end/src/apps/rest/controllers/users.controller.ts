import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Login from 'src/context/users/application/login/login';
import { LoginDto } from 'src/context/users/application/login/login.dto';
import { LoginResponseDto } from 'src/context/users/application/login/loginResponse.dto';
import RegisterUser from 'src/context/users/application/registerUser/registerUser';
import { RegisterUserDto } from 'src/context/users/application/registerUser/registerUser.dto';
import { UserDto } from 'src/context/users/application/user.dto';
import { TokenInfo } from '../decorators/tokenInfo.decorator';
import Logout from 'src/context/users/application/logout/logout';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly registerUser: RegisterUser,
        private readonly loginService: Login,
        private readonly logoutService: Logout,
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

    @Post('/login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({
        status: 401,
        description: 'The user has not been logged in.',
    })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in.',
        type: LoginResponseDto,
    })
    login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.loginService.run(dto);
    }

    @Post('/logout')
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
