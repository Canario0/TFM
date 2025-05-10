import { ApiProperty, PickType } from '@nestjs/swagger';
import { CategoryDto, SubCategoryDto } from '../category.dto';
import { ValidateNested } from 'class-validator';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CreateSubCategoryDto extends PickType(SubCategoryDto, [
    'name',
    'icon',
    'metadata',
]) {}

export class CreateCategoryDto extends PickType(CategoryDto, ['name', 'icon']) {
    @ApiProperty({ type: [CreateSubCategoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSubCategoryDto)
    subCategories: CreateSubCategoryDto[];
}
