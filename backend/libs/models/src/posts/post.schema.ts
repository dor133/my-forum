import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from '@app/models/users/user.schema'

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {
    @Prop()
    title: string

    @Prop()
    text: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    authorId: User

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
