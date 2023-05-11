import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { Connection, connect } from 'mongoose'
import { UsersService } from '@app/users'

describe('App (e2e)', () => {
    let app: INestApplication
    let jwtService: JwtService
    let db: Connection
    let userService: UsersService

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'fixtures-test' }),
                AppModule,
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '6000s' },
                }),
            ],
        }).compile()

        userService = moduleFixture.get<UsersService>(UsersService)
        jwtService = moduleFixture.get<JwtService>(JwtService)
        db = (await connect(process.env.MONGO_URI, { dbName: 'fixtures-test' })).connection
        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        console.log('Removing database ')
        await db.dropDatabase()
        console.log('Database removed')
        await app.close()
    })

    it('(db check) should return generic_user', async () => {
        const user = await userService.findOne('generic_user')
        expect(user).toMatchObject({ username: 'generic_user' })
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
    })

    it('/profile (GET) without authentication', () => {
        return request(app.getHttpServer()).get('/profile').expect(401)
    })

    it('/profile (GET) with authentication', () => {
        const JWT = jwtService.sign({ username: 'username', sub: 'userId' })

        return request(app.getHttpServer())
            .get('/profile')
            .set('Authorization', 'Bearer ' + JWT)
            .expect(200)
            .expect({
                user: {
                    username: 'username',
                    userId: 'userId',
                },
            })
    })

    it('/auth/login (POST) with existant user, should return a JWT', async () => {
        const user = {
            username: 'generic_user',
            password: 'password',
        }

        return request(app.getHttpServer())
            .post('/auth/login')
            .send(user)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('access_token')
            })
    })

    it('/auth/login (POST) with non existant user, should throw a 404', () => {
        const user = {
            username: 'bad_username',
            password: 'password123',
        }

        return request(app.getHttpServer())
            .post('/auth/login')
            .send(user)
            .expect(404)
            .expect({
                statusCode: 404,
                message: `User with username ${user.username} not found`,
                error: 'Not Found',
            })
    })

    it('/auth/login (POST) with wrong password, should throw a 401', () => {
        const user = {
            usrename: 'generic_user',
            password: 'wrong_password',
        }

        return request(app.getHttpServer()).post('/auth/login').send(user).expect(401).expect({
            statusCode: 401,
            message: 'Unauthorized',
        })
    })

    it('/auth/login (POST) with missing password, should throw a 401', () => {
        const user = {
            username: 'generic_user',
        }

        return request(app.getHttpServer()).post('/auth/login').send(user).expect(401)
    })
})
