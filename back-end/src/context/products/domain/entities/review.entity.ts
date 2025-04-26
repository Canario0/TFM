import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';

type User = { id: string; username: string };

export class ReviewEntity extends BaseEntity {
    constructor(
        public readonly user: User,
        public readonly rating: number,
        public comment: string,
    ) {
        super();
    }

    public toPrimitives(): Primitives<ReviewEntity> {
        return {
            user: this.user,
            rating: this.rating,
            comment: this.comment,
        };
    }

    public static fromPrimitives(
        primitives: Primitives<ReviewEntity>,
    ): ReviewEntity {
        return new ReviewEntity(
            primitives.user,
            primitives.rating,
            primitives.comment,
        );
    }

    public static createReview(data: {
        user: User;
        rating: number;
        comment: string;
    }): ReviewEntity {
        this.validateComment(data.comment);
        this.validateRating(data.rating);
        return new ReviewEntity(data.user, data.rating, data.comment);
    }

    private static validateComment(comment: string): void {
        if (comment.length > 250) {
            throw new InvalidArgumentError(
                'La review no debe tener más de 250 caracteres',
            );
        }
    }

    private static validateRating(rating: number): void {
        if (rating < 1 || rating > 10) {
            throw new InvalidArgumentError(
                'La puntuación debe estar entre 1 y 10',
            );
        }
    }
}
