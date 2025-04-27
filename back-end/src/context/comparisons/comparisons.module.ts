import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MongoComparisonRepository } from './infrastructure/mongoDB/mongoComparison.repository';
import { COMPARISON_REPOSITORY } from './domain/persistence/comparison.repository';

@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: COMPARISON_REPOSITORY,
            useClass: MongoComparisonRepository,
        },
    ],
    exports: [],
})
export class ComparisonsModule {}
