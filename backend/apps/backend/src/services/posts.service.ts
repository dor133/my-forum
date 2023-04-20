import { PostForumDocument, PostForum } from '@app/models/posts/post.schema'
import { Injectable, NotFoundException, ConflictException, Request } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostDto } from './dto/create-post.dto'
import { User, UserDocument } from '@app/models/users/user.schema'
import { UpdatePostDto } from './dto/update-post.dto'
import * as mongoose from 'mongoose'
import { Comment, CommentDocument } from '@app/models/comments/comment.schema'

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(PostForum.name) private postModel: Model<PostForumDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) {}

    async findAll(): Promise<PostForum[]> {
        const existingPosts = this.postModel.find().exec()
        if (!existingPosts) {
            throw new NotFoundException('No posts found')
        }
        return existingPosts
    }

    async findOneById(id: string): Promise<PostForum> {
        const existingPost = await this.postModel.findById(id).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found`)
        }
        return existingPost
    }

    async create(createPostDto: CreatePostDto, userId: string): Promise<PostForum> {
        const createdPost = new this.postModel(createPostDto)
        // const existingPost = await this.postModel.findOne({ title: createPostDto.title }, { _id: 1 }).exec()
        // if (existingPost) {
        //     throw new ConflictException('Post with this title already exists')
        // }
        const user = new this.userModel({ _id: userId })
        createdPost.authorId = user
        console.log(createdPost.authorId)
        return createdPost.save()
    }

    async update(updatePostDto: UpdatePostDto, id: string, userId: string): Promise<PostForum> {
        const existingPost = await this.postModel.findOneAndUpdate({ _id: id, authorId: userId }, updatePostDto, { new: true, projection: { _id: 1 } }).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found, or you don't have permission to edit it`)
        }
        return existingPost
    }

    async delete(id: string, userId: string): Promise<PostForum> {
        const existingPost = await this.postModel.findOneAndDelete({ _id: id, authorId: userId }, { projection: { _id: 1 } }).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found, or you don't have permission to delete it`)
        }
        // const existingCommentsIds = await this.commentModel.find({ postId: id }, { _id: 1 }).exec()
        await this.commentModel.deleteMany({ postId: id }).exec()
        return existingPost
    }
}
