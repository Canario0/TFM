import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';

export class ComparisonEntity extends AggregateRoot {
    public readonly id: string;
    public readonly ownerId: string;
    public name: string;
    public description?: string;
    constructor(
        id: string,
        ownerId: string,
        name: string,
        description?: string,
        version?: number,
    ) {
        super(version);
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
    }

    public toPrimitives(): Primitives<ComparisonEntity> {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            description: this.description,
            version: this.version,
        };
    }

    public static fromPrimitives(
        primitives: Primitives<ComparisonEntity>,
    ): ComparisonEntity {
        return new ComparisonEntity(
            primitives.id,
            primitives.ownerId,
            primitives.name,
            primitives.description,
            primitives.version,
        );
    }

    public static save(
        id: string,
        ownerId: string,
        name: string,
        description?: string,
    ): ComparisonEntity {
        this.validateName(name);
        if (description) this.validateDescription(description);
        return new ComparisonEntity(id, ownerId, name, description);
    }

    private static validateName(name: string): void {
        if (name.length < 3) {
            throw new InvalidArgumentError(
                'El nombre de la comparación debe tener al menos 3 caracteres',
            );
        }
        if (name.length > 100) {
            throw new InvalidArgumentError(
                'El nombre de la comparación no debe tener más de 100 caracteres',
            );
        }
    }

    public static validateDescription(description: string): void {
        if (description.length > 250) {
            throw new InvalidArgumentError(
                'La descripción no debe tener más de 250 caracteres',
            );
        }
    }
}
