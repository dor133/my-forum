import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/models/users/user.schema'
import { UpdateUserDto } from '@app/users/dto/update-user.dto'
import { CreateUserDto } from '@app/users/dto/create-user.dto'
import { UserParamDto } from '@app/users/dto/user-param.dto'
import { Public } from '@app/auth/jwt-public'
import { PostForum } from '@app/models/posts/post.schema'
import { Comment } from '@app/models/comments/comment.schema'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Public()
    @Get(':id')
    getUser(@Param() params: UserParamDto): Promise<User> {
        return this.usersService.findOneById(params.id)
    }

    @Public()
    @Post()
    postUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    putUser(@Body() updateUserDto: UpdateUserDto, @Param() params: UserParamDto, @Request() req): Promise<User> {
        return this.usersService.update(updateUserDto, params.id, req.user.userId)
    }

    @Get(':id/posts')
    getUserPosts(@Param() params: UserParamDto): Promise<PostForum[]> {
        return this.usersService.findPosts(params.id)
    }

    @Get(':id/comments')
    getUserComments(@Param() params: UserParamDto): Promise<Comment[]> {
        return this.usersService.findComments(params.id)
    }
}
