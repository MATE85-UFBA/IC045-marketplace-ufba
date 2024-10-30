import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersSevice: UsersService) {};

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.usersSevice.create(user);
    }   

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.usersSevice.findOne(id);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() user: CreateUserDto) {
        return this.usersSevice.update(id, user);
    }

    @Delete(":id")
    delete(@Param("id") id: number) {
        return this.usersSevice.delete(id);
    }

}
