import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';

export enum SubcategoryIcons {
    CPU = 'CPU',
    GPU = 'GPU',
    RAM = 'RAM',
    Storage = 'Storage',
    Display = 'Display',
    Camera = 'Camera',
    Battery = 'Battery',
    Design = 'Design',
    Dimensions = 'Dimensions',
    OS = 'OS',
    Connectivity = 'Connectivity',
    Audio = 'Audio',
    Price = 'Price',
    Popularity = 'Popularity',
    ReleaseDate = 'ReleaseDate',
    Other = 'Other',
}

export class SubCategory {
    constructor(
        public readonly name: string,
        public readonly icon: SubcategoryIcons,
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
        icon?: SubcategoryIcons,
    ): SubCategory {
        this.validateName(name);
        this.validateNonDuplicatedMetadata(metadata);
        return new SubCategory(name, icon ?? SubcategoryIcons.Other, metadata);
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

export enum CategoryIcons {
    Smartphone = 'Smartphone',
    Tablet = 'Tablet',
    Laptop = 'Laptop',
    Camera = 'Camera',
    Headphones = 'Headphones',
    Smartwatch = 'Smartwatch',
    Console = 'Console',
    TV = 'TV',
    Speaker = 'Speaker',
    Appliance = 'Appliance',
    ActionCamera = 'ActionCamera',
    Drone = 'Drone',
    Other = 'Other',
}

export class CategoryEntity extends BaseEntity {
    private subcategoryNameSet: Set<string>;
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly icon: CategoryIcons,
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

    public static async createCategory(
        id: string,
        name: string,
        icon?: CategoryIcons,
    ): Promise<CategoryEntity> {
        this.validateName(name);
        return new CategoryEntity(id, name, icon ?? CategoryIcons.Other, []);
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
