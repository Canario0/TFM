import { PickType } from '@nestjs/swagger';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductDto } from '../product.dto';

export class ProductSummaryDto extends PickType(ProductDto, [
    'id',
    'name',
    'icon',
    'category',
    'rating',
    'price',
    'maker',
    'brand',
    'model',
    'description',
]) {
    constructor(product: ProductEntity) {
        super();
        this.id = product.id;
        this.name = product.name;
        this.icon = product.icon;
        this.category = product.category;
        this.rating = product.rating;
        this.price = product.price;
        this.maker = product.maker;
        this.brand = product.brand;
        this.model = product.model;
        this.description = product.description;
    }

    static fromEntity(product: ProductEntity): ProductSummaryDto {
        return new ProductSummaryDto(product);
    }
}
