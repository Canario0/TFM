import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { ProductDto } from '../product.dto';

export class UpdateProductDto extends PickType(PartialType(ProductDto), [
    'name',
    'description',
    'price',
    'maker',
    'brand',
    'model',
    'subCategories',
]) {}
