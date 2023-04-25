import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '@app/models/users/user.schema'
import { PostForum } from '../posts/post.schema'

export type CommentDocument = HydratedDocument<Comment>

@Schema()
export class Comment {
    @Prop()
    text: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostForum' })
    postId: PostForum

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date

    @Prop()
    likes: number
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
