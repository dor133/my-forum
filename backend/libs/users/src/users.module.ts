import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@app/models/users/user.schema'
import { PostForum } from '@app/models/posts/post.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: PostForum.name, schema: PostForum }])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
