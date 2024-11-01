import { Body, Controller, Post } from '@nestjs/common';
import { DemandDTO } from '@/demand/demand.dto';
import { DemandService } from '@/demand/demand.service';

@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  create(@Body() demand: DemandDTO) {
    console.log(demand);
    return this.demandService.create(demand);
  }
}
