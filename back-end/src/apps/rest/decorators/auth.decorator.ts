import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

export const ROLE_METADATA_KEY = Symbol('roles');

export function Auth(...roles: UserRole[]) {
    return applyDecorators(
        SetMetadata(ROLE_METADATA_KEY, roles),
        UseGuards(AuthGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiForbiddenResponse({ description: 'Forbidden' }),
    );
}
