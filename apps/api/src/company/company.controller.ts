import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  sendEmail(@Body() body: { message: string; research_group: string; companyId: string }) {
    return this.companyService.sendEmail(body.message, body.research_group, body.companyId);
  }
}
