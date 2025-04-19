import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';
import { IsString, Length } from 'class-validator';

export class LoginDto extends PickType(UserDto, ['username']) {
    @ApiProperty()
    @IsString({ message: 'Password must be a string' })
    @Length(8, 64, { message: 'Password must be between 8 and 64 characters' })
    password: string;
}
