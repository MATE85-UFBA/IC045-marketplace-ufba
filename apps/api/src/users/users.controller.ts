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
import { UsersService } from './users.service';
import { ChangePasswordDto, CreateUserDto } from './users.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSevice: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersSevice.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersSevice.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: CreateUserDto) {
    return this.usersSevice.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersSevice.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(@Body() data: ChangePasswordDto, @Request() req: { user: { userId: string } }) {
    const id = req.user.userId
    return this.usersSevice.changePassword(id, data);
  }
}
