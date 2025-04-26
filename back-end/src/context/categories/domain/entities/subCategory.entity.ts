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
                'Name must be at least 3 characters long',
            );
        }
        if (name.length > 100) {
            throw new InvalidArgumentError(
                'Name must be no more than 100 characters long',
            );
        }
    }

    private static validateNonDuplicatedMetadata(metadata: string[]): void {
        const uniqueMetadata = new Set(metadata);
        if (uniqueMetadata.size !== metadata.length) {
            throw new InvalidArgumentError('Metadata must be unique');
        }
    }
}
