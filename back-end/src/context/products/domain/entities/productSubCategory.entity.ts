import { Primitives } from '@codelytv/primitives-type';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';

export class ProductSubCategory {
    constructor(
        public readonly name: string,
        public readonly icon: Icons,
        public readonly metadata: Record<string, string>[],
    ) {}

    public toPrimitives(): Primitives<ProductSubCategory> {
        return {
            name: this.name,
            icon: this.icon,
            metadata: this.metadata,
        };
    }
    // HACK: This is a hack to make the metadata field the correct type
    public static fromPrimitives(
        primitives: Primitives<ProductSubCategory> & {
            metadata: Record<string, string>[];
        },
    ): ProductSubCategory {
        return new ProductSubCategory(
            primitives.name,
            primitives.icon,
            primitives.metadata,
        );
    }

    public static createSubCategory(
        name: string,
        metadata: Record<string, string>[],
        icon?: Icons,
    ): ProductSubCategory {
        this.validateName(name);
        return new ProductSubCategory(name, icon ?? Icons.Other, metadata);
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
}
