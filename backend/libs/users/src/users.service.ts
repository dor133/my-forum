import { User, UserDocument } from '@app/models/users/user.schema'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'
import { PostForum } from '@app/models/posts/post.schema'
import { Comment } from '@app/models/comments/comment.schema'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(PostForum.name) private postModel: Model<PostForum>,
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) {}

    async findAll(): Promise<User[]> {
        const existingUsers = this.userModel.find().exec()
        if (!existingUsers) {
            throw new NotFoundException('No users found')
        }
        return existingUsers
    }

    async findOneById(id: string): Promise<UserDocument> {
        const existingUser = await this.userModel.findById(id, { _id: 1, username: 1, createdDate: 1 }).exec()
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return existingUser
    }

    async findOne(username: string): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ username: username }).exec()
        if (!existingUser) {
            throw new NotFoundException(`User with username ${username} not found`)
        }
        return existingUser
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto)
        const existingUser = await this.userModel.findOne({ $or: [{ email: createUserDto.email }, { username: createUserDto.username }] }, { _id: 1 }).exec()
        if (existingUser) {
            throw new ConflictException('User with this email or username already exists')
        }
        const salt = 10
        const password = createdUser.password
        createdUser.password = await bcrypt.hash(password, salt)
        return createdUser.save()
    }

    async update(updateUserDto: UpdateUserDto, id: string, userId: string): Promise<User> {
        if (id !== userId) {
            throw new NotFoundException(`You don't have permission to edit this user`)
        }
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true, projection: { _id: 1 } }).exec()
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return existingUser
    }

    async findPosts(id: string): Promise<PostForum[]> {
        const existingPosts = await this.postModel.find({ author: id }, { _id: 1, title: 1 }).exec()
        if (!existingPosts) {
            throw new NotFoundException(`No posts or error finding posts for user with ID ${id}`)
        }
        return existingPosts
    }

    async findComments(id: string): Promise<Comment[]> {
        const existingComments = await this.commentModel.find({ author: id }, { _id: 1 }).exec()
        if (!existingComments) {
            throw new NotFoundException(`No comments or error finding comments for user with ID ${id}`)
        }
        return existingComments
    }
}
