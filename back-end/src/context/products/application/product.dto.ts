import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { Icons } from 'src/context/shared/domain/types';
import { ProductSubCategory } from '../domain/entities/productSubCategory.entity';
import { ReviewEntity } from '../domain/entities/review.entity';
import { ProductEntity } from '../domain/entities/product.entity';
import { Type } from 'class-transformer';

class ProductMetadataDto {
    @ApiProperty()
    @Length(3, 100, {
        message: 'Key must be between 3 and 100 characters',
    })
    @IsString()
    key: string;

    @ApiProperty()
    @Length(3, 100, {
        message: 'Value must be between 3 and 100 characters',
    })
    @IsString()
    value: string;
}

export class ProductSubCategoryDto {
    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Name must be between 3 and 100 characters',
    })
    name: string;

    @ApiProperty({ enum: Icons })
    @IsEnum(Icons, {
        message: 'Icon must be a valid subcategory icon',
    })
    icon: Icons;

    @ApiProperty({ type: [ProductMetadataDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductMetadataDto)
    metadata: ProductMetadataDto[];

    constructor(subCategory: ProductSubCategory) {
        this.name = subCategory.name;
        this.icon = subCategory.icon;
        this.metadata = subCategory.metadata;
    }

    static fromEntity(subCategory: ProductSubCategory): ProductSubCategoryDto {
        return new ProductSubCategoryDto(subCategory);
    }
}

class UserDto {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Username must be between 3 and 100 characters',
    })
    username: string;
}

export class ReviewDto {
    @ApiProperty({ type: UserDto })
    @ValidateNested()
    user: UserDto;

    @ApiProperty()
    @IsInt()
    @Max(10)
    @Min(1)
    rating: number;

    @ApiProperty()
    @Length(0, 250, {
        message: 'Comment must be between 0 and 250 characters',
    })
    @IsString()
    comment: string;

    constructor(review: ReviewEntity) {
        this.user = review.user;
        this.rating = review.rating;
        this.comment = review.comment;
    }

    static fromEntity(review: ReviewEntity): ReviewDto {
        return new ReviewDto(review);
    }
}

export class ProductDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Name must be between 3 and 100 characters',
    })
    name: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Category must be between 3 and 100 characters',
    })
    category: string;

    @ApiProperty()
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 2,
    })
    @Max(10)
    @Min(1)
    rating: number;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Maker must be between 3 and 100 characters',
    })
    maker: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Brand must be between 3 and 100 characters',
    })
    brand: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Model must be between 3 and 100 characters',
    })
    model: string;

    @ApiProperty()
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 2,
    })
    @Min(0)
    price: number;

    @ApiProperty()
    @IsString()
    @Length(0, 250, {
        message: 'Description must be between 0 and 250 characters',
    })
    @IsOptional()
    description?: string;

    @ApiProperty({ enum: Icons })
    @IsEnum(Icons, {
        message: 'Icon must be a valid category icon',
    })
    icon: Icons;

    @ApiProperty({ type: [ProductSubCategoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductSubCategory)
    subCategories: ProductSubCategoryDto[];

    @ApiProperty({ type: [ReviewDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReviewDto)
    reviews: ReviewDto[];

    constructor(product: ProductEntity) {
        this.id = product.id;
        this.name = product.name;
        this.category = product.category;
        this.rating = parseFloat(product.rating.toFixed(2));
        this.maker = product.maker;
        this.brand = product.brand;
        this.model = product.model;
        this.price = product.price;
        this.description = product.description;
        this.icon = product.icon;
        this.subCategories = product.subCategories.map(
            ProductSubCategoryDto.fromEntity,
        );
        this.reviews = product.reviews.map(ReviewDto.fromEntity);
    }
    static fromEntity(product: ProductEntity): ProductDto {
        return new ProductDto(product);
    }
}
