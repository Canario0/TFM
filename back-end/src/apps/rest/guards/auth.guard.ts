import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import UnauthorizedError from 'src/context/shared/domain/errors/unauthorizedError';
import { Logger, LOGGER } from 'src/context/shared/domain/logger';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { ROLE_METADATA_KEY } from '../decorators/auth.decorator';
import ForbiddenError from 'src/context/shared/domain/errors/forbiddenError';
import InternalError from 'src/context/shared/domain/errors/internalError';
import { extractTokenFromHeader } from '../utils';
import CheckBlacklist from 'src/context/users/application/checkBlacklist/checkBlacklist';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(LOGGER) private readonly logger: Logger,
        private readonly reflector: Reflector,
        private readonly checkBlacklist: CheckBlacklist,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<UserRole[]>(
            ROLE_METADATA_KEY,
            context.getHandler(),
        );
        if (!roles) {
            throw new InternalError('Roles no encontrados');
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedError();
        }
        try {
            const decoded = verify(token, process.env.JWT_SECRET!, {
                issuer: 'api.comparathor.com',
            });
            const isBlacklisted = await this.checkBlacklist.run(decoded['jti']);
            if (isBlacklisted) {
                throw new UnauthorizedError();
            }
            const tokenRoles = decoded['roles'] ?? [];
            const hasValidRole = roles.some((role) =>
                tokenRoles.includes(role),
            );
            if (!hasValidRole) {
                throw new ForbiddenError(
                    'Acceso denegado: permisos insuficientes',
                );
            }
        } catch (error) {
            this.logger.debug('Invalid token', error);
            throw new UnauthorizedError();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        return extractTokenFromHeader(request);
    }
}
