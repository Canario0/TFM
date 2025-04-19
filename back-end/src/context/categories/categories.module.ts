import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoCategoryRepository } from './infrastructure/mongoDB/mongoCategory.repository';
import { CATEGORY_REPOSITORY } from './domain/persistence/category.respository';
import { FindAllCategories } from './application/findAll/findaAllCategories';
import { FindCategoryById } from './application/findById/findaCategoryById';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: CATEGORY_REPOSITORY,
            useClass: MongoCategoryRepository,
        },
        FindAllCategories,
        FindCategoryById,
    ],
    exports: [FindAllCategories, FindCategoryById],
})
export class CategoriesModule {}
