import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { extractTokenFromHeader } from '../utils';
import { decode } from 'jsonwebtoken';

export const TokenInfo = createParamDecorator(
    (
        _data: unknown,
        ctx: ExecutionContext,
    ):
        | { jti: string; exp: number; username: string; sub: string }
        | undefined => {
        const token = extractTokenFromHeader(ctx.switchToHttp().getRequest());
        if (!token) {
            return undefined;
        }
        try {
            const payload = decode(token);
            if (!payload) {
                return undefined;
            }
            return {
                jti: payload['jti'],
                exp: payload['exp'],
                username: payload['username'],
                sub: payload['sub'] as string,
            };
        } catch (error) {
            return undefined;
        }
    },
);
