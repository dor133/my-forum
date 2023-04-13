import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/models/users/user.schema'
import { UpdateUserDto } from '@app/users/dto/update-user.dto'
import { CreateUserDto } from '@app/users/dto/create-user.dto'

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
    putUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(updateUserDto, id)
    }
}
