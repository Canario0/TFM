import { PickType } from '@nestjs/swagger';
import { ReviewDto } from '../product.dto';

export class CreateReviewDto extends PickType(ReviewDto, [
    'rating',
    'comment',
]) {}
