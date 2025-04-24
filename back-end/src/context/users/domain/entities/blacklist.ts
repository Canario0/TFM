import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';

export class BlacklistEntity extends BaseEntity {
    constructor(
        public readonly jti: string,
        public readonly expiresAt: Date,
    ) {
        super();
    }

    public toPrimitives(): Primitives<BlacklistEntity> {
        return {
            jti: this.jti,
            expiresAt: this.expiresAt.getTime(),
        };
    }

    public static fromPrimitives(
        primitives: Primitives<BlacklistEntity>,
    ): BlacklistEntity {
        return new BlacklistEntity(
            primitives.jti,
            new Date(primitives.expiresAt),
        );
    }

    public static expireToken(jti: string, exp: number): BlacklistEntity {
        const remainingTime = exp * 1000 - Date.now();
        return new BlacklistEntity(jti, new Date(Date.now() + remainingTime));
    }
}
