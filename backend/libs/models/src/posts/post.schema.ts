import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '@app/models/users/user.schema'

export type PostForumDocument = HydratedDocument<PostForum>

@Schema()
export class PostForum {
    @Prop()
    title: string

    @Prop()
    text: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date

    @Prop()
    likes: number
}

export const PostForumSchema = SchemaFactory.createForClass(PostForum)
