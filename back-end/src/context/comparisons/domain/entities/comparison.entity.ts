import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';

export class ComparisonEntity extends AggregateRoot {
    public readonly id: string;
    public readonly ownerId: string;
    public name: string;
    public description?: string;
    public productIds: string[];

    constructor(
        id: string,
        ownerId: string,
        name: string,
        productIds: string[],
        description?: string,
        version?: number,
    ) {
        super(version);
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.productIds = productIds;
        this.description = description;
    }

    public updateName(name: string): void {
        if (name === this.name) {
            return;
        }
        ComparisonEntity.validateName(name);
        this.name = name;
        this.markDirty('name');
    }

    public updateDescription(description: string): void {
        if (description === this.description) {
            return;
        }
        ComparisonEntity.validateDescription(description);
        this.description = description;
        this.markDirty('description');
    }

    public updateProductIds(productIds: string[]): void {
        if (
            this.productIds.length === productIds.length &&
            this.productIds.every((id, index) => id === productIds[index])
        ) {
            return;
        }
        this.productIds = productIds;
        this.markDirty('productIds');
    }

    public toPrimitives(): Primitives<ComparisonEntity> {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            productIds: this.productIds,
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
            primitives.productIds,
            primitives.description,
            primitives.version,
        );
    }

    public static save(
        id: string,
        ownerId: string,
        name: string,
        product: string[],
        description?: string,
    ): ComparisonEntity {
        this.validateName(name);
        if (description) this.validateDescription(description);
        return new ComparisonEntity(id, ownerId, name, product, description);
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
