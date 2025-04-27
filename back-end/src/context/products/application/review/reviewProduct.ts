import { Inject, Injectable } from '@nestjs/common';
import {
    PRODUCT_REPOSITORY,
    ProductRepository,
} from '../../domain/persistence/product.repository';
import { ReviewDto } from '../product.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';
import { ReviewEntity } from '../../domain/entities/review.entity';
import { CreateReviewDto } from './createReview.dto';

@Injectable()
export class ReviewProduct {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) {}

    async run(
        productId: string,
        user: { username: string; id: string },
        reviewRaw: CreateReviewDto,
    ): Promise<ReviewDto> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundError('Producto no encontrado');
        }
        const review = ReviewEntity.createReview({
            user,
            rating: reviewRaw.rating,
            comment: reviewRaw.comment,
        });
        product.addReview(review);
        await this.productRepository.update(product);
        return ReviewDto.fromEntity(review);
    }
}
