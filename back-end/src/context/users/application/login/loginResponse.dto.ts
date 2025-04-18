import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  idToken: string;

  constructor(idToken: string) {
    this.idToken = idToken;
  }
}
