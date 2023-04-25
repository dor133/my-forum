import { Controller, Get, Param, Post, Body, Request, Delete, Req } from '@nestjs/common'
import { CommentsService } from '../services/comments.service'
import { Public } from '@app/auth/jwt-public'
import { Comment } from '@app/models/comments/comment.schema'
import { CreateCommentDto } from '../services/dto/create-comment.dto'
import { CommentParamDto } from '../services/dto/comment-param.dto'
import { CommentLike } from '@app/models/likes/commentsLikes/commentLike.schema'

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Public()
    @Get()
    getComments(@Param() params: CommentParamDto, @Req() req): Promise<Comment[]> {
        return this.commentsService.findAll(params.postId, req.user)
    }

    @Public()
    @Get(':id')
    getComment(@Param() params: CommentParamDto): Promise<Comment> {
        return this.commentsService.findOneById(params.id)
    }

    @Post()
    postComment(@Body() createCommentDto: CreateCommentDto, @Request() req, @Param() params: CommentParamDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto, req.user.userId, params.postId)
    }

    @Delete(':id')
    deleteComment(@Param() params: CommentParamDto, @Request() req): Promise<Comment> {
        return this.commentsService.delete(params.id, req.user.userId)
    }

    @Post(':id/likes')
    addLike(@Request() req, @Param() params: CommentParamDto): Promise<CommentLike> {
        return this.commentsService.addLike(params.id, req.user.userId)
    }

    @Delete(':id/likes')
    removeLike(@Request() req, @Param() params: CommentParamDto): Promise<CommentLike> {
        return this.commentsService.removeLike(params.id, req.user.userId)
    }
}
