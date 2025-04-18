import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Login from 'src/context/users/application/login/login';
import { LoginDto } from 'src/context/users/application/login/login.dto';
import { LoginResponseDto } from 'src/context/users/application/login/loginResponse.dto';
import RegisterUser from 'src/context/users/application/registerUser/registerUser';
import { RegisterUserDto } from 'src/context/users/application/registerUser/registerUser.dto';
import { UserDto } from 'src/context/users/application/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginService: Login,
  ) {}

  @Post('/register')
  register(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.registerUser.run(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.loginService.run(dto);
  }
}
