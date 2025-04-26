import { PickType } from '@nestjs/swagger';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { CategoryDto } from '../category.dto';

export class CategoryPreviewDto extends PickType(CategoryDto, [
    'id',
    'name',
    'icon',
]) {
    constructor(category: CategoryEntity) {
        super();
        this.id = category.id;
        this.name = category.name;
        this.icon = category.icon;
    }

    static fromEntity(category: CategoryEntity): CategoryPreviewDto {
        return new CategoryPreviewDto(category);
    }
}
