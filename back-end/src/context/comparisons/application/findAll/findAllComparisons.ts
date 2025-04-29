import { Inject, Injectable } from '@nestjs/common';
import {
    COMPARISON_REPOSITORY,
    ComparisonRepository,
} from '../../domain/persistence/comparison.repository';
import { ComparisonDto } from '../comparison.dto';

@Injectable()
export class FindAllComparisons {
    constructor(
        @Inject(COMPARISON_REPOSITORY)
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async run(ownerId: string): Promise<ComparisonDto[]> {
        const comparisons = await this.comparisonRepository.findAll(
            {},
            ownerId,
        );
        return comparisons.map(ComparisonDto.fromEntity);
    }
}
