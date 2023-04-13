import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/models/users/user.schema'
import { UpdateUserDto } from '@app/users/dto/update-user.dto'
import { CreateUserDto } from '@app/users/dto/create-user.dto'
import { UserParamDto } from '@app/users/dto/user-param.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(':id')
    getUser(@Param() params: UserParamDto): Promise<User> {
        return this.usersService.findOne(params.id)
    }

    @Post()
    postUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    putUser(@Body() updateUserDto: UpdateUserDto, @Param() params: UserParamDto): Promise<User> {
        return this.usersService.update(updateUserDto, params.id)
    }
}
