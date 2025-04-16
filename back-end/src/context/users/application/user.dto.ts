import { IsEnum, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity, UserRole } from '../domain/entities/user.entity';

export class UserDto {
  @ApiProperty({ format: 'uuid' })
  id: string;
  @ApiProperty()
  @IsString({ message: 'Username must be a string' })
  @Length(3, 100, { message: 'Username must be between 3 and 100 characters' })
  username: string;
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole, { message: 'Role must be a valid user role' })
  role: UserRole;

  constructor(user: UserEntity) {
    const primitives = user.toPrimitives();

    this.id = primitives.id;
    this.username = primitives.username;
    this.role = primitives.role;
  }

  static fromEntity(user: UserEntity): UserDto {
    return new UserDto(user);
  }
}
