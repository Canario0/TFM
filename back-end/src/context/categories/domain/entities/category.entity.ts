import { Primitives } from '@codelytv/primitives-type';
import BaseEntity from 'src/context/shared/domain/entities/baseEntity';
import InvalidArgumentError from 'src/context/shared/domain/errors/invalidArgumentError';

export class SubCategory {
  constructor(
    public readonly name: string,
    public readonly metadata: string[],
  ) {}

  public toPrimitives(): Primitives<SubCategory> {
    return {
      name: this.name,
      metadata: this.metadata,
    };
  }
  public static fromPrimitives(
    primitives: Primitives<SubCategory>,
  ): SubCategory {
    return new SubCategory(primitives.name, primitives.metadata);
  }

  public static createSubCategory(
    name: string,
    metadata: string[],
  ): SubCategory {
    this.validateNonDuplicatedMetadata(metadata);
    return new SubCategory(name, metadata);
  }

  private static validateNonDuplicatedMetadata(metadata: string[]): void {
    const uniqueMetadata = new Set(metadata);
    if (uniqueMetadata.size !== metadata.length) {
      throw new InvalidArgumentError('Metadata must be unique');
    }
  }
}

export class CategoryEntity extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly subCategories: SubCategory[],
  ) {
    super();
  }

  public toPrimitives(): Primitives<CategoryEntity> {
    return {
      id: this.id,
      name: this.name,
      subCategories: this.subCategories.map((subCategory) =>
        subCategory.toPrimitives(),
      ),
    };
  }

  public addSubCategory(subCategory: SubCategory): void {
    if (
      this.subCategories.some(
        (subCategory) => subCategory.name === subCategory.name,
      )
    ) {
      throw new InvalidArgumentError('Subcategory already exists');
    }
    this.subCategories.push(subCategory);
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
      primitives.subCategories.map(SubCategory.fromPrimitives),
    );
  }

  public static async createCategory(
    id: string,
    name: string,
  ): Promise<CategoryEntity> {
    this.validateName(name);
    return new CategoryEntity(id, name, []);
  }

  private static validateName(name: string): void {
    if (name.length < 3) {
      throw new InvalidArgumentError('Name must be at least 3 characters long');
    }
    if (name.length > 100) {
      throw new InvalidArgumentError(
        'Name must be no more than 100 characters long',
      );
    }
  }
}
