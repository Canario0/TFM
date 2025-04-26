import { ApiProperty } from '@nestjs/swagger';
import {
    CategoryEntity,
    CategoryIcons,
    SubCategory,
    SubcategoryIcons,
} from '../domain/entities/category.entity';
import { IsEnum, IsString, Length } from 'class-validator';

export class SubCategoryDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Name must be between 3 and 100 characters',
    })
    name: string;

    @ApiProperty({ enum: SubcategoryIcons })
    @IsEnum(SubcategoryIcons, {
        message: 'Icon must be a valid subcategory icon',
    })
    icon: SubcategoryIcons;

    @ApiProperty()
    @IsString({ each: true })
    metadata: string[];

    constructor(subCategory: SubCategory) {
        this.name = subCategory.name;
        this.icon = subCategory.icon;
        this.metadata = subCategory.metadata;
    }

    static fromEntity(subCategory: SubCategory): SubCategoryDto {
        return new SubCategoryDto(subCategory);
    }
}

export class CategoryDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Name must be between 3 and 100 characters',
    })
    name: string;

    @ApiProperty({ enum: CategoryIcons })
    @IsEnum(CategoryIcons, {
        message: 'Icon must be a valid category icon',
    })
    icon: CategoryIcons;

    @ApiProperty({ type: [SubCategoryDto] })
    subCategories: SubCategoryDto[];

    constructor(category: CategoryEntity) {
        this.id = category.id;
        this.name = category.name;
        this.icon = category.icon;
        this.subCategories = category.subCategories.map(
            SubCategoryDto.fromEntity,
        );
    }

    static fromEntity(category: CategoryEntity): CategoryDto {
        return new CategoryDto(category);
    }
}
