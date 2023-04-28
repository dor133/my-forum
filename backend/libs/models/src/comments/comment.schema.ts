import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'
import { PostForum } from '../posts/post.schema'

export type CommentDocument = HydratedDocument<Comment>

@Schema({ toJSON: { virtuals: true } })
export class Comment {
    @Prop()
    text: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostForum' })
    postId: PostForum

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)

CommentSchema.virtual('likes', {
    ref: 'CommentLike',
    localField: '_id',
    foreignField: 'commentId',
})
