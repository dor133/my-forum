import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'
import { UsersController } from './controllers/users.controller'
import { User, UserSchema } from '@app/models/users/user.schema'
import { AuthController } from './controllers/auth.controller'
import { UsersModule } from '@app/users'
import { AuthModule } from '@app/auth'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { PostsController } from './controllers/posts.controller'
import { PostsService } from './services/posts.service'
import { PostForum, PostForumSchema } from '@app/models/posts/post.schema'
import { CommentsController } from './controllers/comments.controller'
import { CommentsService } from './services/comments.service'
import { CommentSchema, Comment } from '@app/models/comments/comment.schema'
import { CommentLike, CommentLikeSchema } from '@app/models/likes/commentsLikes/commentLike.schema'
import { PostLike, PostLikeSchema } from '@app/models/likes/postsLikes/postLike.schema'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'my-forum' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: PostForum.name, schema: PostForumSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema }]),
        MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController, UsersController, AuthController, PostsController, CommentsController],
    providers: [
        AppService,
        {
            provide: 'APP_GUARD',
            useClass: JwtAuthGuard,
        },
        PostsService,
        CommentsService,
    ],
})
export class AppModule {}
