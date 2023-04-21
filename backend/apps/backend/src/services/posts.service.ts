import { PostForumDocument, PostForum } from '@app/models/posts/post.schema'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostDto } from './dto/create-post.dto'
import { User, UserDocument } from '@app/models/users/user.schema'
import { UpdatePostDto } from './dto/update-post.dto'
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
        const existingPost = await this.postModel.findById(id).populate('author', { _id: 1, username: 1 }).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found`)
        }
        return existingPost
    }

    async create(createPostDto: CreatePostDto, userId: string): Promise<PostForum> {
        const createdPost = new this.postModel(createPostDto)
        const user = new this.userModel({ _id: userId })
        createdPost.author = user
        console.log(createdPost.author)
        return createdPost.save()
    }

    async update(updatePostDto: UpdatePostDto, id: string, userId: string): Promise<PostForum> {
        const existingPost = await this.postModel.findOneAndUpdate({ _id: id, author: userId }, updatePostDto, { new: true, projection: { _id: 1 } }).exec()
        if (!existingPost) {
            throw new NotFoundException(`Post with ID ${id} not found, or you don't have permission to edit it`)
        }
        return existingPost
    }

    async delete(ids: string[], userId: string): Promise<string> {
        const existingPosts = await this.postModel.find({ _id: { $in: ids }, author: userId }, { _id: 1 }).exec()
        if (!existingPosts || existingPosts.length == 0) {
            throw new NotFoundException(`Posts not found, or you don't have permission to delete it/them`)
        }
        await this.postModel.deleteMany({ _id: { $in: ids }, author: userId }).exec()
        await this.commentModel.deleteMany({ postId: { $in: ids } }).exec()
        return 'Post(s) deleted'
    }
}
