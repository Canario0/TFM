import { PartialType, PickType } from '@nestjs/swagger';
import { ComparisonDto } from '../comparison.dto';

export class UpdateComparisonDto extends PickType(PartialType(ComparisonDto), [
    'name',
    'description',
    'productIds',
]) {}
