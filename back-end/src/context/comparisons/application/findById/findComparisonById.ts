import { Inject, Injectable } from '@nestjs/common';
import NotFoundError from 'src/context/shared/domain/errors/notFoundError';
import {
    COMPARISON_REPOSITORY,
    ComparisonRepository,
} from '../../domain/persistence/comparison.repository';
import { ComparisonDto } from '../comparison.dto';

@Injectable()
export class FindComparisonById {
    constructor(
        @Inject(COMPARISON_REPOSITORY)
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async run(ownerId: string, id: string): Promise<ComparisonDto> {
        const comparison = await this.comparisonRepository.findById(
            id,
            ownerId,
        );
        if (!comparison) {
            throw new NotFoundError('La comparativa no se ha encontrado');
        }
        return ComparisonDto.fromEntity(comparison);
    }
}
