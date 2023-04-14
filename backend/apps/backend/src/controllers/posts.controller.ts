import { Controller, Get, Param, Post, Body, Request } from '@nestjs/common'
import { PostsService } from '../services/posts.service'
import { PostForum } from '@app/models/posts/post.schema'
import { PostParamDto } from '../services/dto/post-param.dto'
import { CreatePostDto } from '../services/dto/create-post.dto'
import { Public } from '@app/auth/jwt-public'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getPosts(): Promise<PostForum[]> {
        return this.postsService.findAll()
    }

    @Get(':id')
    getPost(@Param() params: PostParamDto): Promise<PostForum> {
        return this.postsService.findOneById(params.id)
    }

    // @Public()
    @Post()
    postPost(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostForum> {
        return this.postsService.create(createPostDto, req.user._id)
    }
}
