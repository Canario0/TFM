import { PickType } from '@nestjs/swagger';
import { ComparisonDto } from '../comparison.dto';

export class CreateComparisonDto extends PickType(ComparisonDto, [
    'name',
    'description',
    'productIds',
]) {}
