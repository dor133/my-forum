import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { AppModule } from '../../src/app.module'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'
import { Connection, connect } from 'mongoose'
import { UsersService } from '@app/users'
import { PostForum, PostForumSchema } from '@app/models/posts/post.schema'
import { Model } from 'mongoose'
import { Comment, CommentSchema } from '@app/models/comments/comment.schema'
const dbName = process.env.MONGO_RANDOM_ID

export let app: INestApplication
export let jwtService: JwtService
let db: Connection
let usersService: UsersService
let postModel: Model<PostForum>
let commentModel: Model<Comment>
export const genericIds = {
    userId: null,
    postId: null,
    commentId: null,
}

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(process.env.MONGO_URI, { dbName: dbName }),
            AppModule,
            JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '6000s' },
            }),
        ],
    }).compile()

    usersService = moduleFixture.get<UsersService>(UsersService)
    jwtService = moduleFixture.get<JwtService>(JwtService)

    db = (await connect(process.env.MONGO_URI, { dbName: dbName })).connection
    postModel = db.model(PostForum.name, PostForumSchema)
    commentModel = db.model(Comment.name, CommentSchema)
    genericIds.userId = (await usersService.findOne('generic_user'))._id
    genericIds.postId = (await postModel.findOne({ title: 'generic_title' }))._id
    genericIds.commentId = (await commentModel.findOne({ title: 'generic_comment' }))._id
    app = moduleFixture.createNestApplication()
    await app.init()
})

afterAll(async () => {
    console.log('Removing database ' + dbName)
    await db.dropDatabase()
    console.log('Database removed')
    await app.close()
})

it('(db check) should return generic_user', async () => {
    const user = await usersService.findOne('generic_user')
    expect(user).toMatchObject({ username: 'generic_user' })
})

console.log('setup loaded')
