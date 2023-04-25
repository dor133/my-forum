import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { PostForum } from '../posts/post.schema'
import { Comment } from '../comments/comment.schema'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostForum' })
    postsLiked: PostForum[]

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    commentsLiked: Comment[]
}

export const UserSchema = SchemaFactory.createForClass(User)
