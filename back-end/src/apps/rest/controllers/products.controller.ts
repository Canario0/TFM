import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProducts } from 'src/context/products/application/findAll/findAllCategories';
import { ProductSummaryDto } from 'src/context/products/application/findAll/productSummary.dto';
import { FindProductById } from 'src/context/products/application/findById/findProductById';
import { ProductDto } from 'src/context/products/application/product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
    constructor(
        private readonly findAllProducts: FindAllProducts,
        private readonly findProductById: FindProductById,
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'Get all products in preview mode' })
    @ApiResponse({
        status: 200,
        description: 'The products have been successfully retrieved.',
        type: [ProductSummaryDto],
    })
    all(): Promise<ProductSummaryDto[]> {
        return this.findAllProducts.run();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully retrieved.',
        type: ProductDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The product has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The category id is not a valid UUID.',
    })
    oneById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
        return this.findProductById.run(id);
    }
}
