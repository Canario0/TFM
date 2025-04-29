import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ComparisonEntity } from '../domain/entities/comparison.entity';

export class ComparisonDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty()
    @IsString()
    @Length(3, 100, {
        message: 'Name must be between 3 and 100 characters',
    })
    name: string;

    @ApiProperty()
    @IsUUID(undefined, { each: true })
    @IsArray()
    productIds: string[];

    @ApiProperty()
    @IsString()
    @Length(0, 250, {
        message: 'Description must be between 0 and 250 characters',
    })
    @IsOptional()
    description?: string;

    constructor(comparison: ComparisonEntity) {
        this.id = comparison.id;
        this.name = comparison.name;
        this.description = comparison.description;
        this.productIds = comparison.productIds;
    }
    static fromEntity(comparison: ComparisonEntity): ComparisonDto {
        return new ComparisonDto(comparison);
    }
}
