import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';
import { hash, verify } from 'argon2';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import UnauthorizedError from 'src/context/shared/domain/errors/unauthorizedError';
import { sign } from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class UserEntity extends AggregateRoot {
    public readonly id: string;
    public username: string;
    public readonly password: string;
    public role: UserRole;

    constructor(
        id: string,
        username: string,
        password: string,
        role: UserRole,
        version?: number,
    ) {
        super(version);
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }

    public promote(): void {
        if (this.role === UserRole.ADMIN) {
            return;
        }
        this.role = UserRole.ADMIN;
        this.markDirty('role');
    }

    public toPrimitives(): Primitives<UserEntity> {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.role,
            version: this.version,
        };
    }

    public async login(password: string): Promise<string> {
        if (!(await verify(this.password, password))) {
            throw new UnauthorizedError('Invalid username or password');
        }
        return sign(
            { roles: [this.role], username: this.username },
            process.env.JWT_SECRET!,
            {
                jwtid: randomUUID(),
                subject: this.id,
                expiresIn: '12h',
                issuer: 'api.comparathor.com',
            },
        );
    }

    public static fromPrimitives(
        primitives: Primitives<UserEntity>,
    ): UserEntity {
        return new UserEntity(
            primitives.id,
            primitives.username,
            primitives.password,
            primitives.role,
            primitives.version,
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
                'La contraseña debe tener al menos 8 caracteres',
            );
        }
        if (password.length > 64) {
            throw new InvalidArgumentError(
                'La contraseña no debe tener más de 64 caracteres',
            );
        }
    }

    private static validateUsername(username: string): void {
        if (username.length < 3) {
            throw new InvalidArgumentError(
                'El nombre de usuario debe tener al menos 3 caracteres',
            );
        }
        if (username.length > 100) {
            throw new InvalidArgumentError(
                'El nombre de usuario no debe tener más de 100 caracteres',
            );
        }
    }
}
