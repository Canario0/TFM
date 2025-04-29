import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
    COMPARISON_REPOSITORY,
    ComparisonRepository,
} from '../../domain/persistence/comparison.repository';
import { CreateComparisonDto } from './createComparison.dto';
import { ComparisonDto } from '../comparison.dto';
import { ComparisonEntity } from '../../domain/entities/comparison.entity';

@Injectable()
export class CreateComparison {
    constructor(
        @Inject(COMPARISON_REPOSITORY)
        private readonly comparisonRepository: ComparisonRepository,
    ) {}

    async run(
        ownerId: string,
        comparisonRaw: CreateComparisonDto,
    ): Promise<ComparisonDto> {
        const comparison = ComparisonEntity.save(
            randomUUID(),
            ownerId,
            comparisonRaw.name,
            comparisonRaw.productIds,
            comparisonRaw.description,
        );
        await this.comparisonRepository.create(comparison);
        return ComparisonDto.fromEntity(comparison);
    }
}
