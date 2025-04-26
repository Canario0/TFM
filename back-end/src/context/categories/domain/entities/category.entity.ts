import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';
import { SubCategory } from './subCategory.entity';

export class CategoryEntity extends BaseEntity {
    private subcategoryNameSet: Set<string>;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly icon: Icons,
        public readonly subCategories: SubCategory[],
    ) {
        super();
        this.subcategoryNameSet = new Set(
            this.subCategories.map((subCategory) => subCategory.name),
        );
    }

    public toPrimitives(): Primitives<CategoryEntity> {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            subCategories: this.subCategories.map((subCategory) =>
                subCategory.toPrimitives(),
            ),
        };
    }

    public addSubCategory(subCategory: SubCategory): void {
        if (this.subcategoryNameSet.has(subCategory.name)) {
            throw new InvalidArgumentError('Subcategory already exists');
        }
        this.subCategories.push(subCategory);
        this.subcategoryNameSet.add(subCategory.name);
    }

    public removeSubCategory(subCategory: SubCategory): void {
        const index = this.subCategories.indexOf(subCategory);
        if (index !== -1) {
            this.subCategories.splice(index, 1);
        }
    }

    public static fromPrimitives(
        primitives: Primitives<CategoryEntity>,
    ): CategoryEntity {
        return new CategoryEntity(
            primitives.id,
            primitives.name,
            primitives.icon,
            primitives.subCategories.map(SubCategory.fromPrimitives),
        );
    }

    public static createCategory(
        id: string,
        name: string,
        icon?: Icons,
    ): CategoryEntity {
        this.validateName(name);
        return new CategoryEntity(id, name, icon ?? Icons.Other, []);
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
}
