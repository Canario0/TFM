import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../domain/entities/category.entity';
import { IsArray, IsEnum, IsString, Length, ValidateNested } from 'class-validator';
import { Icons } from 'src/context/shared/domain/types';
import { SubCategory } from '../domain/entities/subCategory.entity';
import { Type } from 'class-transformer';

export class SubCategoryDto {
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

    @ApiProperty({ enum: Icons })
    @IsEnum(Icons, {
        message: 'Icon must be a valid category icon',
    })
    icon: Icons;

    @ApiProperty({ type: [SubCategoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubCategoryDto)
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
