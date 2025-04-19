import { Inject, Injectable } from '@nestjs/common';
import {
    CATEGORY_REPOSITORY,
    CategoryRepository,
} from '../../domain/persistence/category.respository';
import { CategoryPreviewDto } from './categoryPreview.dto';

@Injectable()
export class FindAllCategories {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async run(): Promise<CategoryPreviewDto[]> {
        const categories = await this.categoryRepository.findAll({});
        return categories.map((category) => new CategoryPreviewDto(category));
    }
}
