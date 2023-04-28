import { Controller, Put, Get, Param, Post, Body, Req, Delete } from '@nestjs/common'
import { PostsService } from '../services/posts.service'
import { PostForum } from '@app/models/posts/post.schema'
import { PostParamDto } from '../services/dto/post-param.dto'
import { CreatePostDto } from '../services/dto/create-post.dto'
import { Public } from '@app/auth/jwt-public'
import { UpdatePostDto } from '../services/dto/update-post.dto'
import { DeletePostDto } from '../services/dto/delete-post.dto'
import { PostLike } from '@app/models/likes/postsLikes/postLike.schema'
import { User } from '@app/models/users/user.schema'

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
    getPost(@Param() params: PostParamDto, @Req() req): Promise<PostForum> {
        return this.postsService.findOneById(params.id, req.user)
    }

    @Post()
    postPost(@Body() createPostDto: CreatePostDto, @Req() req): Promise<PostForum> {
        return this.postsService.create(createPostDto, req.user.userId)
    }

    @Put(':id')
    putPost(@Body() updatePostDto: UpdatePostDto, @Param() params: PostParamDto, @Req() req): Promise<PostForum> {
        return this.postsService.update(updatePostDto, params.id, req.user.userId)
    }

    @Delete()
    deletePost(@Req() req, @Body() deletePostDto: DeletePostDto): Promise<string> {
        return this.postsService.delete(deletePostDto.ids, req.user.userId)
    }

    @Post(':id/likes')
    addLike(@Req() req, @Param() params: PostParamDto): Promise<PostLike> {
        return this.postsService.addLike(params.id, req.user.userId)
    }

    @Delete(':id/likes')
    removeLike(@Req() req, @Param() params: PostParamDto): Promise<PostLike> {
        return this.postsService.removeLike(params.id, req.user.userId)
    }

    @Get('analytics/lastweeks')
    getLastWeekPosts(): Promise<PostForum> {
        return this.postsService.getLastPostsAnalytics()
    }

    @Get('analytics/user/lastweeks')
    getUserLastWeekPosts(@Req() req): Promise<PostForum> {
        return this.postsService.getLastPostsAnalytics(req.user.userId)
    }

    @Get('analytics/user/likes')
    getUserLastWeekLikes(@Req() req): Promise<PostLike> {
        return this.postsService.getUserLikesAnalytics(req.user.userId)
    }

    @Public()
    @Get('analytics/mostactive')
    getMostActiveUsers(): Promise<User[]> {
        return this.postsService.getMostActiveUsers()
    }
}
