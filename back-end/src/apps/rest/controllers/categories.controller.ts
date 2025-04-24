import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/context/categories/application/category.dto';
import { CategoryPreviewDto } from 'src/context/categories/application/findAll/categoryPreview.dto';
import { FindAllCategories } from 'src/context/categories/application/findAll/findAllCategories';
import { FindCategoryById } from 'src/context/categories/application/findById/findCategoryById';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { Auth } from '../decorators/auth.decorator';
import { CreateCategoryDto } from 'src/context/categories/application/create/createCategory.dto';
import { CreateCategory } from 'src/context/categories/application/create/create';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
    constructor(
        private readonly findAllCategories: FindAllCategories,
        private readonly findCategoryById: FindCategoryById,
        private readonly createCategory: CreateCategory,
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'Get all categories in preview mode' })
    @ApiResponse({
        status: 200,
        description: 'The categories have been successfully retrieved.',
        type: [CategoryPreviewDto],
    })
    all(): Promise<CategoryPreviewDto[]> {
        return this.findAllCategories.run();
    }

    @Get('/:id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Get a category by id' })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully retrieved.',
        type: CategoryDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The category has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The category id is not a valid UUID.',
    })
    oneById(@Param('id', ParseUUIDPipe) id: string): Promise<CategoryDto> {
        return this.findCategoryById.run(id);
    }

    @Post('/')
    @Auth(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
        type: CategoryDto,
    })
    @ApiResponse({
        status: 400,
        description: 'The category is not valid.',
    })
    create(@Body() category: CreateCategoryDto): Promise<CategoryDto> {
        return this.createCategory.run(category);
    }
}
