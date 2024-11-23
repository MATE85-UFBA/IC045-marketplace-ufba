import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Roles } from '@/roles/roles.decorator';
import { RolesGuard } from '@/roles/roles.guard';
import { UpdateUserDto } from '@/user/user.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get("users")
    getUsers() {
        return this.adminService.getUsers();
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Put("users/:id")
    editUser(@Param('id') id: string, @Body() updatedUserData: UpdateUserDto) {
        return this.adminService.editUser(id, updatedUserData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Delete("users/:id")
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }

}
