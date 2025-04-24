import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import UnauthorizedError from 'src/context/shared/domain/errors/unauthorizedError';
import { Logger, LOGGER } from 'src/context/shared/domain/logger';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { ROLE_METADATA_KEY } from '../decorators/auth.decorator';
import ForbiddenError from 'src/context/shared/domain/errors/forbiddenError';
import InternalError from 'src/context/shared/domain/errors/internalError';

const AUTH_HEADER = 'authorization';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(LOGGER) private readonly logger: Logger,
        private readonly reflector: Reflector,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
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
        let token: string | null = null;
        if (request.headers[AUTH_HEADER]) {
            const auth_params = this.parseAuthHeader(
                request.headers[AUTH_HEADER],
            );
            if (auth_params && 'bearer' === auth_params.scheme.toLowerCase()) {
                token = auth_params.value;
            }
        }
        return token;
    }

    private parseAuthHeader(
        header: string,
    ): { scheme: string; value: string } | null {
        if (typeof header !== 'string') {
            return null;
        }
        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }
        return { scheme: parts[0], value: parts[1] };
    }
}
