import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../domain/persistence/user.repository';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../domain/entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class RegisterAdminUser implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async onModuleInit() {
    const adminConfig = this.configService.get('admin');
    if (!adminConfig.username || !adminConfig.password) {
      return;
    }
    const adminCount = await this.userRepository.count({
      role: UserRole.ADMIN,
    });
    if (adminCount > 0) {
      return;
    }
    const admin = await User.createAdminUser(
      randomUUID(),
      adminConfig.username,
      adminConfig.password,
    );
    await this.userRepository.create(admin);
  }
}
