import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { User } from '@app/models/users/user.schema'
import { CreateUserDto } from '../services/create-user.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    getUser(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id)
    }

    @Post()
    postUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    putUser(@Body() updateUserDto: CreateUserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(updateUserDto, id)
    }
}
