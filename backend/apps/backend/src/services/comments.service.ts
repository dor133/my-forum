import { CommentDocument, Comment } from '@app/models/comments/comment.schema'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto'
import { User, UserDocument } from '@app/models/users/user.schema'
import * as mongoose from 'mongoose'
import { PostForum, PostForumDocument } from '@app/models/posts/post.schema'

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(PostForum.name) private postModel: Model<PostForumDocument>
    ) {}

    async findAll(postId: string): Promise<Comment[]> {
        const existingComments = await this.commentModel.find({ postId: postId }).populate('author', { _id: 1, username: 1 }).exec()
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
        return existingComment
    }

    async addLike(id: string, postId: string, userId: string): Promise<Comment> {
        const alreadyLiked = await this.userModel.findOne({ _id: userId, commentsLiked: id }, { _id: 1 }).exec()
        if (alreadyLiked) {
            throw new ConflictException(`You already liked this comment`)
        }
        const existingUser = await this.userModel
            .findOneAndUpdate({ _id: userId }, { $push: { commentsLiked: id } }, { new: true, projection: { _id: 1 } })
            .exec()
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${userId} not found, or you don't have permission`)
        }
        const existingComment = await this.commentModel
            .findOneAndUpdate({ _id: id, postId: postId }, { $inc: { likes: 1 } }, { new: true, projection: { _id: 1 } })
            .exec()
        if (!existingComment) {
            throw new NotFoundException(`Comment with ID ${id} not found, or you don't have permission to edit it`)
        }
        return existingComment
    }

    async removeLike(id: string, postId: string, userId: string): Promise<Comment> {
        const liked = await this.userModel.findOne({ _id: userId, commentsLiked: id }, { _id: 1 }).exec()
        if (!liked) {
            throw new ConflictException(`You don't like this comment`)
        }
        const existingUser = await this.userModel
            .findOneAndUpdate({ _id: userId }, { $pull: { commentsLiked: id } }, { new: true, projection: { _id: 1 } })
            .exec()
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${userId} not found, or you don't have permission`)
        }
        const existingComment = await this.commentModel
            .findOneAndUpdate({ _id: id, postId: postId }, { $inc: { likes: -1 } }, { new: true, projection: { _id: 1 } })
            .exec()
        if (!existingComment) {
            throw new NotFoundException(`Post with ID ${id} not found, or you don't have permission to edit it`)
        }
        return existingComment
    }
}
