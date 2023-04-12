import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

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
}

export const UserSchema = SchemaFactory.createForClass(User)
