import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoComparisonRepository } from './infrastructure/mongoDB/mongoComparison.repository';
import { COMPARISON_REPOSITORY } from './domain/persistence/comparison.repository';
import { CreateComparison } from './application/create/create';
import { FindAllComparisons } from './application/findAll/findAllComparisons';
import { FindComparisonById } from './application/findById/findComparisonById';
import { UpdateComparison } from './application/update/updateComparison';
import { DeleteComparison } from './application/delete/delete';
@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: COMPARISON_REPOSITORY,
            useClass: MongoComparisonRepository,
        },
        CreateComparison,
        FindAllComparisons,
        FindComparisonById,
        UpdateComparison,
        DeleteComparison,
    ],
    exports: [
        CreateComparison,
        FindAllComparisons,
        FindComparisonById,
        UpdateComparison,
        DeleteComparison,
    ],
})
export class ComparisonsModule {}
