import { Primitives } from '@codelytv/primitives-type';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';

export class SubCategory {
    constructor(
        public readonly name: string,
        public readonly icon: Icons,
        public readonly metadata: string[],
    ) {}

    public toPrimitives(): Primitives<SubCategory> {
        return {
            name: this.name,
            icon: this.icon,
            metadata: this.metadata,
        };
    }
    public static fromPrimitives(
        primitives: Primitives<SubCategory>,
    ): SubCategory {
        return new SubCategory(
            primitives.name,
            primitives.icon,
            primitives.metadata,
        );
    }

    public static createSubCategory(
        name: string,
        metadata: string[],
        icon?: Icons,
    ): SubCategory {
        this.validateName(name);
        this.validateNonDuplicatedMetadata(metadata);
        return new SubCategory(name, icon ?? Icons.Other, metadata);
    }

    private static validateName(name: string): void {
        if (name.length < 3) {
            throw new InvalidArgumentError(
                'El nombre de la subcategoría debe tener al menos 3 caracteres',
            );
        }
        if (name.length > 100) {
            throw new InvalidArgumentError(
                'El nombre de la subcategoría no debe tener más de 100 caracteres',
            );
        }
    }

    private static validateNonDuplicatedMetadata(metadata: string[]): void {
        const uniqueMetadata = new Set(metadata);
        if (uniqueMetadata.size !== metadata.length) {
            throw new InvalidArgumentError(
                'Los metadatos de la subcategoría deben ser únicos',
            );
        }
    }
}
