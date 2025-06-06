import { Inject, Injectable } from '@nestjs/common';
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from '../../domain/persistence/category.repository';
import { CategoryDto } from '../category.dto';
import { CreateCategoryDto } from './createCategory.dto';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { randomUUID } from 'crypto';
import { SubCategory } from '../../domain/entities/subCategory.entity';

@Injectable()
export class CreateCategory {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async run(categoryRaw: CreateCategoryDto): Promise<CategoryDto> {
        const category = CategoryEntity.createCategory(
            randomUUID(),
            categoryRaw.name,
            categoryRaw.icon,
        );
        categoryRaw.subCategories.forEach((subCategory) => {
            category.addSubCategory(
                SubCategory.createSubCategory(
                    subCategory.name,
                    subCategory.metadata,
                    subCategory.icon,
                ),
            );
        });
        await this.categoryRepository.create(category);
        return CategoryDto.fromEntity(category);
    }
}
