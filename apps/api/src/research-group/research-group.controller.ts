import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ResearchGroupsService } from './research-group.service';
import { ChangePasswordDto, CreateResearchGroupDto } from './research-group.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('researchGroups')
export class ResearchGroupsController {
    constructor(private readonly researchGroupsSevice: ResearchGroupsService) { }

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

    @UseGuards(JwtAuthGuard)
    @Post('/change-password')
    changePassword(@Body() data: ChangePasswordDto, @Request() req: { researchGroup: { researchGroupId: string } }) {
        const id = req.researchGroup.researchGroupId
        return this.researchGroupsSevice.changePassword(id, data);
    }
}
