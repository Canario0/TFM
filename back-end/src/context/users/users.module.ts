import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { USER_REPOSITORY } from './domain/persistence/user.repository';
import { MongoUserRepository } from './infrastructure/mongoDB/mongoUser.repository';
import { RegisterAdminUser } from './application/registerAdmin/registerAdminUser';
import RegisterUser from './application/registerUser/registerUser';
import Login from './application/login/login';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: MongoUserRepository,
        },
        RegisterAdminUser,
        RegisterUser,
        Login,
    ],
    exports: [RegisterUser, Login],
})
export class UsersModule {}
