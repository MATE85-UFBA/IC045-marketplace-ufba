import { PrismaService } from '@/infra/database/prisma.service';
import { MailService } from '@/mailsend/mail.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CompanyService {
    constructor(
        private readonly mailService: MailService,
        private readonly prismaService: PrismaService,
    ) { }

    async sendEmail(message: string, research_group: string, companyId: string) {

        // Send email to company
        const company = await this.prismaService.user.findUnique({
            where: {
                id: companyId,
            },
            select: {
                email: true,
            },
        });
        if (!company) {
            throw new NotFoundException("Company not found");
        }


        this.mailService.sendTextEmail(company?.email, "Coopera UFBA - Nova mensagem", `Nova mensagem do grupo de pesquisa: ${research_group}. <br> Mensagem: <br> ${message}`);

        return "Email sent";
    }
}
