import { User, UserDocument } from '@app/models/users/user.schema'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        const existingUsers = this.userModel.find().exec()
        if (!existingUsers) {
            throw new NotFoundException('No users found')
        }
        return existingUsers
    }

    async findOneById(id: string): Promise<User> {
        const existingUser = await this.userModel.findById(id, { _id: 1, username: 1 }).exec()
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
}
