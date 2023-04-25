import { PostForum } from '@app/models/posts/post.schema'
import { User } from '@app/models/users/user.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { HydratedDocument } from 'mongoose'

export type PostLikeDocument = HydratedDocument<PostLike>

@Schema()
export class PostLike {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'PostForum' })
    postId: PostForum

    @Prop({ required: true, default: () => new Date() })
    createdDate: Date
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike)
