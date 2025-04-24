import { Inject, Injectable } from '@nestjs/common';
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from '../../domain/persistence/category.repository';
import { CategoryDto } from '../category.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';
import { CreateCategoryDto } from './createCategory.dto';
import {
    CategoryEntity,
    SubCategory,
} from '../../domain/entities/category.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateCategory {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async run(categoryRaw: CreateCategoryDto): Promise<CategoryDto> {
        const category = await CategoryEntity.createCategory(
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
