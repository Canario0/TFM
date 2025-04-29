import { Inject, Injectable } from '@nestjs/common';
import {
    COMPARISON_REPOSITORY,
    ComparisonRepository,
} from '../../domain/persistence/comparison.repository';

@Injectable()
export class DeleteComparison {
    constructor(
        @Inject(COMPARISON_REPOSITORY)
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async run(ownerId: string, comparisonId: string): Promise<void> {
        await this.comparisonRepository.delete(comparisonId, ownerId);
    }
}
