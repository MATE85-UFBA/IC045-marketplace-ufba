import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/roles/roles.decorator';
import { RolesGuard } from '@/roles/roles.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get("users")
    getUsers() {
        return this.adminService.getUsers();
    }
}
