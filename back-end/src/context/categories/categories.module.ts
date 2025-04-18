import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoCategoryRepository } from './infrastructure/mongoDB/mongoCategory.repository';
import { CATEGORY_REPOSITORY } from './domain/persistence/category.respository';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CATEGORY_REPOSITORY,
      useClass: MongoCategoryRepository,
    },
  ],
  exports: [],
})
export class CategoriesModule {}
