import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ResearchGroupService } from './research-group.service';
import { CreateResearchGroupDto } from './research-group.dto';

@Controller('researchGroups')
export class ResearchGroupsController {
    constructor(private readonly researchGroupsSevice: ResearchGroupService) { }

    @Post()
    create(@Body() researchGroup: CreateResearchGroupDto) {
        return this.researchGroupsSevice.create(researchGroup);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.researchGroupsSevice.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() researchGroup: CreateResearchGroupDto) {
        return this.researchGroupsSevice.update(id, researchGroup);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.researchGroupsSevice.delete(id);
    }
}
