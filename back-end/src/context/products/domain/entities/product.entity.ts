import { Primitives } from '@codelytv/primitives-type';
import AggregateRoot from 'src/context/shared/domain/entities/aggregateRoot';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';
import { Icons } from 'src/context/shared/domain/types';
import { ReviewEntity } from './review.entity';
import {
    ProductSubCategory,
    ProductSubCategoryPrimitives,
} from './productSubCategory.entity';

export type ProductPrimitives = Omit<
    Primitives<ProductEntity>,
    'subCategories'
> & { subCategories: ProductSubCategoryPrimitives[] };

export class ProductEntity extends AggregateRoot {
    public readonly id: string;
    public name: string;
    public readonly icon: Icons;
    public readonly category: string;
    public rating: number;
    public maker: string;
    public brand: string;
    public model: string;
    public price: number;
    public reviews: ReviewEntity[];
    public subCategories: ProductSubCategory[];
    public description?: string;
    private subcategoryNameSet: Set<string>;

    constructor(
        id: string,
        name: string,
        icon: Icons,
        category: string,
        rating: number,
        maker: string,
        brand: string,
        model: string,
        price: number,
        reviews: ReviewEntity[],
        subCategories: ProductSubCategory[],
        description?: string,
        version?: number,
    ) {
        super(version);
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.category = category;
        this.rating = rating;
        this.maker = maker;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.reviews = reviews;
        this.subCategories = subCategories;
        this.subcategoryNameSet = new Set(
            this.subCategories.map((sc) => sc.name),
        );
        this.description = description;
    }

    public addReview(review: ReviewEntity): void {
        this.reviews.push(review);
        this.rating = this.computeAverageRating();
        this.markDirty('reviews');
        this.markDirty('rating');
    }

    public hasSubCategory(name: string): boolean {
        return this.subcategoryNameSet.has(name);
    }

    public addSubCategory(subCategory: ProductSubCategory): void {
        if (this.hasSubCategory(subCategory.name)) {
            throw new InvalidArgumentError('La subcategoría ya existe');
        }
        this.subCategories.push(subCategory);
        this.subcategoryNameSet.add(subCategory.name);
        this.markDirty('subCategories');
    }

    public updateSubCategory(subCategories: ProductSubCategory[]): void {
        const newSet = new Set(subCategories.map((sc) => sc.name));
        if (newSet === this.subcategoryNameSet) {
            return;
        }
        this.subCategories = subCategories;
        this.subcategoryNameSet = newSet;
        this.markDirty('subCategories');
    }

    public updateName(name: string): void {
        if (name === this.name) {
            return;
        }
        ProductEntity.validateName(name);
        this.name = name;
        this.markDirty('name');
    }

    public updateMaker(maker: string): void {
        if (maker === this.maker) {
            return;
        }
        this.maker = maker;
        this.markDirty('maker');
    }

    public updateBrand(brand: string): void {
        if (brand === this.brand) {
            return;
        }
        this.brand = brand;
        this.markDirty('brand');
    }

    public updateModel(model: string): void {
        if (model === this.model) {
            return;
        }
        this.model = model;
        this.markDirty('model');
    }

    public updatePrice(price: number): void {
        if (price === this.price) {
            return;
        }
        this.price = price;
        this.markDirty('price');
    }

    public updateDescription(description?: string): void {
        if (description === this.description) {
            return;
        }
        if (description) ProductEntity.validateDescription(description);
        this.description = description;
        this.markDirty('description');
    }

    public toPrimitives(): ProductPrimitives {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            category: this.category,
            rating: this.rating,
            maker: this.maker,
            brand: this.brand,
            model: this.model,
            price: this.price,
            reviews: this.reviews.map((r) => r.toPrimitives()),
            subCategories: this.subCategories.map((sc) => sc.toPrimitives()),
            description: this.description,
            version: this.version,
        };
    }

    private computeAverageRating(): number {
        if (this.reviews.length === 0) {
            return 0;
        }
        const totalRating = this.reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
        );
        return totalRating / this.reviews.length;
    }

    public static fromPrimitives(
        primitives: ProductPrimitives,
    ): ProductEntity {
        return new ProductEntity(
            primitives.id,
            primitives.name,
            primitives.icon,
            primitives.category,
            primitives.rating,
            primitives.maker,
            primitives.brand,
            primitives.model,
            primitives.price,
            primitives.reviews.map(ReviewEntity.fromPrimitives),
            primitives.subCategories.map(ProductSubCategory.fromPrimitives),
            primitives.description,
            primitives.version,
        );
    }

    public static createProduct(data: {
        id: string;
        name: string;
        category: string;
        icon: Icons;
        maker?: string;
        brand?: string;
        model?: string;
        price: number;
        description?: string;
    }): ProductEntity {
        this.validateName(data.name);
        if (data.description) this.validateDescription(data.description);
        return new ProductEntity(
            data.id,
            data.name,
            data.icon ?? Icons.Other,
            data.category,
            0,
            data.maker ?? 'desconocido',
            data.brand ?? 'desconocido',
            data.model ?? 'desconocido',
            data.price,
            [],
            [],
            data.description,
        );
    }

    private static validateName(name: string): void {
        if (name.length < 3) {
            throw new InvalidArgumentError(
                'El nombre del producto debe tener al menos 3 caracteres',
            );
        }
        if (name.length > 100) {
            throw new InvalidArgumentError(
                'El nombre del producto no debe tener más de 100 caracteres',
            );
        }
    }

    private static validateDescription(description: string): void {
        if (description.length > 250) {
            throw new InvalidArgumentError(
                'La descripción no debe tener más de 250 caracteres',
            );
        }
    }
}
