import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProducts } from 'src/context/products/application/findAll/findAllProducts';
import { ProductSummaryDto } from 'src/context/products/application/findAll/productSummary.dto';
import { FindProductById } from 'src/context/products/application/findById/findProductById';
import {
    ProductDto,
    ReviewDto,
} from 'src/context/products/application/product.dto';
import { Auth } from '../decorators/auth.decorator';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { CreateProduct } from 'src/context/products/application/create/create';
import { CreateProductDto } from 'src/context/products/application/create/createProduct.dto';
import { ReviewProduct } from 'src/context/products/application/review/reviewProduct';
import { TokenInfo } from '../decorators/tokenInfo.decorator';
import { CreateReviewDto } from 'src/context/products/application/review/createReview.dto';
import { UpdateProductDto } from 'src/context/products/application/update/update.dto';
import { UpdateProduct } from 'src/context/products/application/update/updateProduct';
import { ProductFilterDto } from '../dtos/productFilter.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
    constructor(
        private readonly findAllProducts: FindAllProducts,
        private readonly findProductById: FindProductById,
        private readonly createProduct: CreateProduct,
        private readonly reviewProduct: ReviewProduct,
        private readonly updateProduct: UpdateProduct,
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'Get all products in preview mode' })
    @ApiQuery({
        name: 'id',
        type: String,
        required: false,
        isArray: true,
        format: 'uuid',
    })
    @ApiResponse({
        status: 200,
        description: 'The products have been successfully retrieved.',
        type: [ProductSummaryDto],
    })
    all(@Query() query: ProductFilterDto): Promise<ProductSummaryDto[]> {
        return this.findAllProducts.run(
            (query.id && query.id.length > 0 && { _id: { $in: query.id } }) ||
                undefined,
        );
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
        description: 'The product id is not a valid UUID.',
    })
    oneById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
        return this.findProductById.run(id);
    }

    @Patch('/:id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully updated.',
        type: ProductDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The product has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The product id is not a valid UUID.',
    })
    @ApiResponse({
        status: 400,
        description: 'The product is not valid.',
    })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() product: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.updateProduct.run(id, product);
    }

    @Post('/:id/reviews')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Post a product review' })
    @ApiResponse({
        status: 201,
        description: 'The product review has been successfully created.',
        type: ReviewDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The product has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The product id is not a valid UUID.',
    })
    @ApiResponse({
        status: 400,
        description: 'The review is not valid.',
    })
    createReview(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() review: CreateReviewDto,
        @TokenInfo() tokenInfo: { username: string; sub: string },
    ): Promise<ReviewDto> {
        return this.reviewProduct.run(
            id,
            {
                username: tokenInfo.username,
                id: tokenInfo.sub,
            },
            review,
        );
    }

    @Post('/')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Create a product' })
    @ApiResponse({
        status: 201,
        description: 'The product has been successfully created.',
        type: ProductDto,
    })
    @ApiResponse({
        status: 400,
        description: 'The product is not valid.',
    })
    create(@Body() product: CreateProductDto): Promise<ProductDto> {
        return this.createProduct.run(product);
    }
}
