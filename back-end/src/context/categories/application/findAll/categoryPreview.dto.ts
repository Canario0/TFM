import { PickType } from '@nestjs/swagger';
import { CategoryDto } from '../category.dto';

export class CategoryPreviewDto extends PickType(CategoryDto, [
    'id',
    'name',
    'icon',
]) {}
