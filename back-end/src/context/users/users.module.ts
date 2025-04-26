import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { USER_REPOSITORY } from './domain/persistence/user.repository';
import { MongoUserRepository } from './infrastructure/mongoDB/mongoUser.repository';
import { RegisterAdminUser } from './application/registerAdmin/registerAdminUser';
import RegisterUser from './application/registerUser/registerUser';
import Login from './application/login/login';
import { BLACKLIST_REPOSITORY } from './domain/persistence/blacklist.repository';
import { MongoBlacklistRepository } from './infrastructure/mongoDB/mongoBlacklist.repository';
import Logout from './application/logout/logout';
import CheckBlacklist from './application/checkBlacklist/checkBlacklist';
import PromoteUser from './application/promote/promote';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: MongoUserRepository,
        },
        {
            provide: BLACKLIST_REPOSITORY,
            useClass: MongoBlacklistRepository,
        },
        RegisterAdminUser,
        RegisterUser,
        Login,
        Logout,
        CheckBlacklist,
        PromoteUser,
    ],
    exports: [RegisterUser, Login, Logout, CheckBlacklist, PromoteUser],
})
export class UsersModule {}
