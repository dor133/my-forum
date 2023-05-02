import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/user.schema'

export type PostForumDocument = HydratedDocument<PostForum>

@Schema({ toJSON: { virtuals: true } })
export class PostForum {
    @Prop()
    title: string

    @Prop()
    text: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date
}

export const PostForumSchema = SchemaFactory.createForClass(PostForum)

PostForumSchema.virtual('like', {
    ref: 'PostLike',
    localField: '_id',
    foreignField: 'postId',
})
