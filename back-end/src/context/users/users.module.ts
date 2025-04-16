import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { USER_REPOSITORY } from './domain/persistence/user.repository';
import { MongoUserRepository } from './infrastructure/mongoDB/mongoUser.repository';
import { RegisterAdminUser } from './application/register/registerAdminUser';
import RegisterUser from './application/register/registerUser';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MongoUserRepository,
    },
    RegisterAdminUser,
    RegisterUser,
  ],
  exports: [RegisterUser],
})
export class UsersModule {}
