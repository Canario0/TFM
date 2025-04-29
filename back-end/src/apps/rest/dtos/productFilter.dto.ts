import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class ProductFilterDto {
    @IsUUID(undefined, { each: true })
    @Transform(({ value }) => {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string')
            return value.split(',').map((v) => v.trim());
        return [];
    })
    @IsArray()
    @IsOptional()
    id?: string[];
}
