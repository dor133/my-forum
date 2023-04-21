import { Controller, Put, Get, Param, Post, Body, Request, Delete } from '@nestjs/common'
import { PostsService } from '../services/posts.service'
import { PostForum } from '@app/models/posts/post.schema'
import { PostParamDto } from '../services/dto/post-param.dto'
import { CreatePostDto } from '../services/dto/create-post.dto'
import { Public } from '@app/auth/jwt-public'
import { UpdatePostDto } from '../services/dto/update-post.dto'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Public()
    @Get()
    getPosts(): Promise<PostForum[]> {
        return this.postsService.findAll()
    }

    @Public()
    @Get(':id')
    getPost(@Param() params: PostParamDto): Promise<PostForum> {
        return this.postsService.findOneById(params.id)
    }

    @Post()
    postPost(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostForum> {
        return this.postsService.create(createPostDto, req.user.userId)
    }

    @Put(':id')
    putPost(@Body() updatePostDto: UpdatePostDto, @Param() params: PostParamDto, @Request() req): Promise<PostForum> {
        return this.postsService.update(updatePostDto, params.id, req.user.userId)
    }

    @Delete(':id')
    deletePost(@Param() params: PostParamDto, @Request() req): Promise<string> {
        return this.postsService.delete(params.id, req.user.userId)
    }
}
