import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoCategoryRepository } from './infrastructure/mongoDB/mongoCategory.repository';
import { CATEGORY_REPOSITORY } from './domain/persistence/category.repository';
import { FindAllCategories } from './application/findAll/findAllCategories';
import { FindCategoryById } from './application/findById/findCategoryById';
import { CreateCategory } from './application/create/create';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: CATEGORY_REPOSITORY,
            useClass: MongoCategoryRepository,
        },
        FindAllCategories,
        FindCategoryById,
        CreateCategory,
    ],
    exports: [FindAllCategories, FindCategoryById, CreateCategory],
})
export class CategoriesModule {}
