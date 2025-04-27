import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';

export class BlacklistEntity extends AggregateRoot {
    public readonly jti: string;
    public readonly expiresAt: Date;

    constructor(jti: string, expiresAt: Date, version?: number) {
        super(version);
        this.jti = jti;
        this.expiresAt = expiresAt;
    }

    public toPrimitives(): Primitives<BlacklistEntity> {
        return {
            jti: this.jti,
            expiresAt: this.expiresAt.getTime(),
            version: this.version,
        };
    }

    public static fromPrimitives(
        primitives: Primitives<BlacklistEntity>,
    ): BlacklistEntity {
        return new BlacklistEntity(
            primitives.jti,
            new Date(primitives.expiresAt),
            primitives.version,
        );
    }

    public static expireToken(jti: string, exp: number): BlacklistEntity {
        const remainingTime = exp * 1000 - Date.now();
        return new BlacklistEntity(jti, new Date(Date.now() + remainingTime));
    }
}
