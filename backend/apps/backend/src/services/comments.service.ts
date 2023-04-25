import { CommentDocument, Comment } from '@app/models/comments/comment.schema'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto'
import { User, UserDocument } from '@app/models/users/user.schema'
import * as mongoose from 'mongoose'
import { PostForum, PostForumDocument } from '@app/models/posts/post.schema'
import { CommentLike, CommentLikeDocument } from '@app/models/likes/commentsLikes/commentLike.schema'

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(PostForum.name) private postModel: Model<PostForumDocument>,
        @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>
    ) {}

    async findAll(postId: string): Promise<Comment[]> {
        const existingComments = await this.commentModel.find({ postId: postId }).populate('author', { _id: 1, username: 1 }).populate('likes').exec()
        if (!existingComments) {
            throw new NotFoundException('No comments found')
        }
        return existingComments
    }

    async findOneById(id: string): Promise<Comment> {
        const existingComment = await this.commentModel.findById(id, { _id: 1 }).exec()
        if (!existingComment) {
            throw new NotFoundException(`Comment with ID ${id} not found`)
        }
        return existingComment
    }

    async create(createCommentDto: CreateCommentDto, userId: string, postId: string): Promise<Comment> {
        const existingPost = await this.postModel.findById(postId, { _id: 1 }).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${postId} not found`)
        }
        const createdComment = new this.commentModel(createCommentDto)
        const user = new this.userModel()
        user._id = new mongoose.Types.ObjectId(userId)
        createdComment.author = user
        const post = new this.postModel()
        post._id = new mongoose.Types.ObjectId(postId)
        createdComment.postId = post
        return createdComment.save()
    }

    async delete(id: string, userId: string): Promise<Comment> {
        const existingComment = await this.commentModel.findOneAndDelete({ _id: id, author: userId }, { projection: { _id: 1 } }).exec()
        if (!existingComment) {
            throw new NotFoundException(`Comment with ID ${id} not found, or you don't have permission to delete it`)
        }
        await this.commentLikeModel.deleteMany({ commentId: id }).exec()
        return existingComment
    }

    async addLike(id: string, userId: string): Promise<CommentLike> {
        const alreadyLiked = await this.commentLikeModel.findOne({ commentId: id, userId: userId }, { _id: 1 }).exec()
        if (alreadyLiked) {
            throw new ConflictException(`You already liked this comment, or it doesn't exist`)
        }
        const createdLike = new this.commentLikeModel({ userId: userId, commentId: id })
        return await createdLike.save()
    }

    async removeLike(id: string, userId: string): Promise<CommentLike> {
        const liked = await this.commentLikeModel.findOneAndDelete({ commentId: id, userId: userId }, { _id: 1 }).exec()
        if (!liked) {
            throw new ConflictException(`You don't like this comment, or it doesn't exist`)
        }
        return liked
    }
}
