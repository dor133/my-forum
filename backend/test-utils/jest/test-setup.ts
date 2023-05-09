import { Test, TestingModule } from '@nestjs/testing'
import { clearDatabase, closeInMongodConnection, createMongodConnection, rootMongooseTestModule } from '../mongo/MongooseTestModule'
import { MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { User, UserSchema } from '@app/models/users/user.schema'
import { PostForum, PostForumSchema } from '@app/models/posts/post.schema'
import { Comment, CommentSchema } from '@app/models/comments/comment.schema'
import { UsersService } from '@app/users'
import { PostsService } from '../../apps/backend/src/services/posts.service'
import { CommentsService } from '../../apps/backend/src/services/comments.service'
import { CommentLike, CommentLikeSchema } from '@app/models/likes/commentsLikes/commentLike.schema'
import { PostLike, PostLikeSchema } from '@app/models/likes/postsLikes/postLike.schema'
import { UsersController } from '../../apps/backend/src/controllers/users.controller'
import { PostsController } from '../../apps/backend/src/controllers/posts.controller'
import { CommentsController } from '../../apps/backend/src/controllers/comments.controller'
import { services, controllers, models } from './references'

beforeAll(async () => {
    let mongoConnection: Connection

    const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [
            rootMongooseTestModule(),
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            MongooseModule.forFeature([{ name: PostForum.name, schema: PostForumSchema }]),
            MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
            MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema }]),
            MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
        ],
        providers: [UsersService, PostsService, CommentsService],
        controllers: [UsersController, PostsController, CommentsController],
    }).compile()

    services.usersService = moduleRef.get<UsersService>(UsersService)
    services.postsService = moduleRef.get<PostsService>(PostsService)
    services.commentsService = moduleRef.get<CommentsService>(CommentsService)
    controllers.usersController = moduleRef.get<UsersController>(UsersController)
    controllers.postsController = moduleRef.get<PostsController>(PostsController)
    controllers.commentsController = moduleRef.get<CommentsController>(CommentsController)
    mongoConnection = await createMongodConnection()
    models.userModel = mongoConnection.model(User.name, UserSchema)
    models.postModel = mongoConnection.model(PostForum.name, PostForumSchema)
    models.commentModel = mongoConnection.model(Comment.name, CommentSchema)
    models.commentLikeModel = mongoConnection.model(CommentLike.name, CommentLikeSchema)
    models.postLikeModel = mongoConnection.model(PostLike.name, PostLikeSchema)
    console.log('setup successful')
})

afterAll(async () => {
    await closeInMongodConnection()
    console.log('connection to in-memory db closed')
})

afterEach(async () => {
    // console.log('db cleared')
    await clearDatabase()
})
