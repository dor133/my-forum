import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@app/models/users/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUser(@Param() params): Promise<User> {
        // console.log(params.id)
        return this.usersService.findOne(params.id);
    }
}