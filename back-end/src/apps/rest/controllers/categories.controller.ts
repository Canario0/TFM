import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/context/categories/application/category.dto';
import { CategoryPreviewDto } from 'src/context/categories/application/findAll/categoryPreview.dto';
import { FindAllCategories } from 'src/context/categories/application/findAll/findaAllCategories';
import { FindCategoryById } from 'src/context/categories/application/findById/findaCategoryById';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
    constructor(
        private readonly findAllCategories: FindAllCategories,
        private readonly findCategoryById: FindCategoryById,
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
}
