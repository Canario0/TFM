import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { FindAllComparisons } from 'src/context/comparisons/application/findAll/findAllComparisons';
import { FindComparisonById } from 'src/context/comparisons/application/findById/findComparisonById';
import { ComparisonDto } from 'src/context/comparisons/application/comparison.dto';
import { CreateComparison } from 'src/context/comparisons/application/create/create';
import { UserRole } from 'src/context/users/domain/entities/user.entity';
import { Auth } from '../decorators/auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenInfo } from '../decorators/tokenInfo.decorator';
import { CreateComparisonDto } from 'src/context/comparisons/application/create/createComparison.dto';
import { UpdateComparison } from 'src/context/comparisons/application/update/updateComparison';
import { UpdateComparisonDto } from 'src/context/comparisons/application/update/update.dto';
import { DeleteComparison } from 'src/context/comparisons/application/delete/delete';

@Controller('comparisons')
@ApiTags('Comparisons')
export class ComparisonsController {
    constructor(
        private readonly findAllComparisons: FindAllComparisons,
        private readonly findComparisonById: FindComparisonById,
        private readonly createComparison: CreateComparison,
        private readonly updateComparison: UpdateComparison,
        private readonly deleteComparison: DeleteComparison,
    ) {}

    @Get()
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Get all comparisons' })
    @ApiResponse({
        status: 200,
        description: 'The comparisons have been successfully retrieved.',
        type: [ComparisonDto],
    })
    async all(
        @TokenInfo() tokenInfo: { sub: string },
    ): Promise<ComparisonDto[]> {
        return this.findAllComparisons.run(tokenInfo.sub);
    }

    @Get(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Get a comparison by id' })
    @ApiResponse({
        status: 200,
        description: 'The comparison has been successfully retrieved.',
        type: ComparisonDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The comparison has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The comparison id is not a valid UUID.',
    })
    oneById(
       @Param('id', ParseUUIDPipe) id: string,
        @TokenInfo() tokenInfo: { sub: string },
    ): Promise<ComparisonDto> {
        return this.findComparisonById.run(tokenInfo.sub, id);
    }

    @Post()
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Create a comparison' })
    @ApiResponse({
        status: 201,
        description: 'The comparison has been successfully created.',
        type: ComparisonDto,
    })
    @ApiResponse({
        status: 400,
        description: 'The comparison is not valid.',
    })
    create(
        @Body() comparison: CreateComparisonDto,
        @TokenInfo() tokenInfo: { sub: string },
    ): Promise<ComparisonDto> {
        return this.createComparison.run(tokenInfo.sub, comparison);
    }

    @Patch(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Update a comparison' })
    @ApiResponse({
        status: 200,
        description: 'The comparison has been successfully updated.',
        type: ComparisonDto,
    })
    @ApiResponse({
        status: 404,
        description: 'The comparison has not been found.',
    })
    @ApiResponse({
        status: 400,
        description: 'The comparison id is not a valid UUID.',
    })
    @ApiResponse({
        status: 400,
        description: 'The comparison is not valid.',
    })
    update(
       @Param('id', ParseUUIDPipe) id: string,
        @Body() comparison: UpdateComparisonDto,
        @TokenInfo() tokenInfo: { sub: string },
    ): Promise<ComparisonDto> {
        return this.updateComparison.run(tokenInfo.sub, id, comparison);
    }
    @Delete(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    @ApiOperation({ summary: 'Delete a comparison' })
    @ApiResponse({
        status: 204,
        description: 'The comparison has been successfully deleted.',
    })
    @ApiResponse({
        status: 400,
        description: 'The comparison id is not a valid UUID.',
    })
    async delete(
       @Param('id', ParseUUIDPipe) id: string,
        @TokenInfo() tokenInfo: { sub: string },
    ): Promise<void> {
        await this.deleteComparison.run(tokenInfo.sub, id);
    }
}
