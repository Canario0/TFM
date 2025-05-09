import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';
import { SubCategory } from './subCategory.entity';

export class CategoryEntity extends AggregateRoot {
    public readonly id: string;
    public readonly name: string;
    public readonly icon: Icons;
    public readonly subCategories: SubCategory[];
    private subcategoryNameSet: Set<string>;
    constructor(
        id: string,
        name: string,
        icon: Icons,
        subCategories: SubCategory[],
        version?: number,
    ) {
        super(version);
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.subCategories = subCategories;
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
            version: this.version,
        };
    }

    public addSubCategory(subCategory: SubCategory): void {
        if (this.subcategoryNameSet.has(subCategory.name)) {
            throw new InvalidArgumentError('La subcategoría ya existe');
        }
        this.subCategories.push(subCategory);
        this.subcategoryNameSet.add(subCategory.name);
        this.markDirty('subCategories');
    }

    public removeSubCategory(subCategory: SubCategory): void {
        const index = this.subCategories.indexOf(subCategory);
        if (index !== -1) {
            this.subCategories.splice(index, 1);
            this.markDirty('subCategories');
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
            primitives.version,
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
                'El nombre de la categoría debe tener al menos 3 caracteres',
            );
        }
        if (name.length > 100) {
            throw new InvalidArgumentError(
                'El nombre de la categoría no debe tener más de 100 caracteres',
            );
        }
    }
}
