import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';
import { hash, verify } from 'argon2';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UserEntity extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: UserRole,
  ) {
    super();
  }

  public toPrimitives(): Primitives<UserEntity> {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
    };
  }

  public async login(password: string): Promise<boolean> {
    return await verify(this.password, password);
  }

  public static fromPrimitives(primitives: Primitives<UserEntity>): UserEntity {
    return new UserEntity(
      primitives.id,
      primitives.username,
      primitives.password,
      primitives.role,
    );
  }

  public static async createUser(
    id: string,
    username: string,
    password: string,
  ): Promise<UserEntity> {
    this.validateUsername(username);
    this.validatePassword(password);
    return new UserEntity(
      id,
      username,
      await this.hashPassword(password),
      UserRole.USER,
    );
  }

  public static async createAdminUser(
    id: string,
    username: string,
    password: string,
  ): Promise<UserEntity> {
    this.validateUsername(username);
    this.validatePassword(password);
    return new UserEntity(
      id,
      username,
      await this.hashPassword(password),
      UserRole.ADMIN,
    );
  }

  private static async hashPassword(password: string): Promise<string> {
    return hash(password);
  }

  private static validatePassword(password: string): void {
    if (password.length < 8) {
      throw new InvalidArgumentError(
        'Password must be at least 8 characters long',
      );
    }
    if (password.length > 64) {
      throw new InvalidArgumentError(
        'Password must be no more than 64 characters long',
      );
    }
  }

  private static validateUsername(username: string): void {
    if (username.length < 3) {
      throw new InvalidArgumentError(
        'Username must be at least 3 characters long',
      );
    }
    if (username.length > 100) {
      throw new InvalidArgumentError(
        'Username must be no more than 100 characters long',
      );
    }
  }
}
