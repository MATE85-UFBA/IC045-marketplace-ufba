import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO } from './demand.dto';
import { DemandService } from '@/demand/demand.service';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { UserService } from '@/user/user.service';

@Controller('demand')
export class DemandController {
  constructor(
    private readonly demandService: DemandService,
    private readonly userService: UserService,
  ) {}

  @Get('/all')
  all() {
    return this.demandService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  my(@Request() req: { user: { userId: string } }) {
    return this.demandService.my(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/private/:id')
  findOnePrivate(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.demandService.findOneIncludingPrivate(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() demand: CreateDemandDTO,
    @Request() req: { user: { userId: string } },
  ) {
    const user = await this.userService.findOneWithCompany(req.user.userId);

    if (!user || !user.company) {
      throw new NotFoundException(
        'Usuário não existe ou não há empresa associada.',
      );
    }

    const companyId = user.company.userId;

    return this.demandService.create(demand, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.demandService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  patch(@Param('id') id: string, @Body() demand: UpdateDemandDTO) {
    return this.demandService.patch(id, demand);
  }
}
