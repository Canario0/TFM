import { Inject, Injectable } from '@nestjs/common';
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from '../../domain/persistence/category.respository';
import { CategoryDto } from '../category.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';

@Injectable()
export class FindCategoryById {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async run(id: string): Promise<CategoryDto> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return CategoryDto.fromEntity(category);
    }
}
