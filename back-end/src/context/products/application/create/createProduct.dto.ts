import { ApiProperty, PickType } from '@nestjs/swagger';
import { ProductDto, ProductSubCategoryDto } from '../product.dto';
import { ValidateNested } from 'class-validator';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductSubCategoryDto extends PickType(ProductSubCategoryDto, [
    'name',
    'icon',
    'metadata',
]) {}

export class CreateProductDto extends PickType(ProductDto, [
    'name',
    'description',
    'price',
    'category',
    'icon',
    'maker',
    'brand',
    'model',
]) {
    @ApiProperty({ type: [CreateProductSubCategoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductSubCategoryDto)
    subCategories: CreateProductSubCategoryDto[];
}
