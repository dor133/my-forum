import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@app/models/users/user.schema'
import { PostForum } from '@app/models/posts/post.schema'
import { Comment } from '@app/models/comments/comment.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: PostForum.name, schema: PostForum }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: Comment }]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
