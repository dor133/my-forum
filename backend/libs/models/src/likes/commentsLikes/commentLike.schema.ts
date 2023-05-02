import { Comment } from '../../comments/comment.schema'
import { User } from '../../users/user.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { HydratedDocument } from 'mongoose'

export type CommentLikeDocument = HydratedDocument<CommentLike>

@Schema()
export class CommentLike {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    commentId: Comment

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike)
