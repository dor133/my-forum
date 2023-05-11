import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { JwtModule, JwtService } from '@nestjs/jwt'

describe('AppController (e2e)', () => {
    let app: INestApplication
    let jwtService: JwtService

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '6000s' },
                }),
            ],
        }).compile()

        jwtService = moduleFixture.get<JwtService>(JwtService)
        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
    })

    it('/profile (GET) without authentication', () => {
        return request(app.getHttpServer()).get('/profile').expect(401)
    })

    it('/profile (GET) with authentication', () => {
        const JWT = jwtService.sign({ username: 'username', sub: 'userId' })

        return (
            request(app.getHttpServer())
                .get('/profile')
                .set('Authorization', 'Bearer ' + JWT)
                .expect(200)
                // .expect('Authenticated !')
                .expect({
                    user: {
                        username: 'username',
                        userId: 'userId',
                    },
                })
        )
    })
})
