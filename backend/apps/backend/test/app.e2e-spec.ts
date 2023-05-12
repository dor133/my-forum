import * as request from 'supertest'
import { app, jwtService } from './utils/test-setup'

describe('App (e2e)', () => {
    describe('Auth', () => {
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
})
