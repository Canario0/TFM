import { Inject, Injectable } from '@nestjs/common';
import { UpdateComparisonDto } from './update.dto';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';
import {
    COMPARISON_REPOSITORY,
    ComparisonRepository,
} from '../../domain/persistence/comparison.repository';
import { ComparisonDto } from '../comparison.dto';

@Injectable()
export class UpdateComparison {
    constructor(
        @Inject(COMPARISON_REPOSITORY)
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async run(
        ownerId: string,
        comparisonId: string,
        comparisonRaw: UpdateComparisonDto,
    ): Promise<ComparisonDto> {
        const comparison = await this.comparisonRepository.findById(
            comparisonId,
            ownerId,
        );
        if (!comparison) {
            throw new NotFoundError('Comparativa no encontrada');
        }
        if (comparisonRaw.name) comparison.updateName(comparisonRaw.name);
        if (comparisonRaw.description)
            comparison.updateDescription(comparisonRaw.description);
        if (comparisonRaw.productIds)
            comparison.updateProductIds(comparisonRaw.productIds);

        await this.comparisonRepository.update(comparison);
        return ComparisonDto.fromEntity(comparison);
    }
}
