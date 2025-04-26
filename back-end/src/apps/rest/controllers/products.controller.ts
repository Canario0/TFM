import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProducts } from 'src/context/products/application/findAll/findAllCategories';
import { ProductSummaryDto } from 'src/context/products/application/findAll/productSummary.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
    constructor(private readonly findAllProducts: FindAllProducts) {}

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

}
