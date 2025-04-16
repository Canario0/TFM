import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RegisterUser from 'src/context/users/application/register/registerUser';
import { RegisterUserDto } from 'src/context/users/application/register/registerUser.dto';
import { UserDto } from 'src/context/users/application/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly registerUser: RegisterUser) {}

  @Post('/register')
  register(@Body() dto: RegisterUserDto): Promise<UserDto> {
    return this.registerUser.run(dto);
  }
}
