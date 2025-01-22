import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, CreateUserDto } from './user.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req: { user: { userId: string } }) {
    return this.usersService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() user: CreateUserDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.usersService.update(req.user.userId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req: { user: { userId: string } }) {
    return this.usersService.delete(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(
    @Body() data: ChangePasswordDto,
    @Request() req: { user: { userId: string } },
  ) {
    const id = req.user.userId;
    return this.usersService.changePassword(id, data);
  }
}
