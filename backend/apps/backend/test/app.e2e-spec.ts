import * as request from 'supertest'
import { app, jwtService, genericIds } from './utils/test-setup'

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

        it('/users (POST) with valid data, should create a valid user', async () => {
            const user = {
                username: 'test_user',
                email: 'email@company.com',
                password: 'my_password',
            }
            await request(app.getHttpServer()).post('/users').send(user).expect(201)

            delete user.email

            return await request(app.getHttpServer()).post('/auth/login').send(user).expect(201)
        })
    })

    describe('Users behavior', () => {
        it('user should be able to create a post, and see it after', async () => {
            const user = {
                username: 'generic_user',
                password: 'password',
            }
            const post = {
                title: "I'm a title",
                text: "I'm a content",
            }
            let JWT = null
            let postId = null

            await request(app.getHttpServer())
                .post('/auth/login')
                .send(user)
                .expect(201)
                .expect((res) => {
                    JWT = res.body.access_token
                })

            await request(app.getHttpServer())
                .post('/posts')
                .set('Authorization', 'Bearer ' + JWT)
                .send(post)
                .expect(201)
                .expect((res) => {
                    postId = res.body._id
                })

            return await request(app.getHttpServer())
                .get('/posts/' + postId)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toMatchObject(post)
                })
        })

        it('user should be able to create a comment, and see it after', async () => {
            const user = {
                username: 'generic_user',
                password: 'password',
            }
            const comment = {
                text: "I'm a content",
            }
            let JWT = null

            await request(app.getHttpServer())
                .post('/auth/login')
                .send(user)
                .expect(201)
                .expect((res) => {
                    JWT = res.body.access_token
                })
            await request(app.getHttpServer())
                .post('/posts/' + genericIds.postId + '/comments')
                .set('Authorization', 'Bearer ' + JWT)
                .send(comment)
                .expect(201)

            return await request(app.getHttpServer())
                .get('/posts/' + genericIds.postId + '/comments')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toMatchObject([comment])
                })
        })

        it('user not logged in should not be able to create a post', async () => {
            const post = {
                title: "I'm a title",
                text: "I'm a content",
            }

            return await request(app.getHttpServer()).post('/posts').send(post).expect(401)
        })

        it('user not logged in should not be able to create a comment', async () => {
            const comment = {
                text: "I'm a content",
            }

            return await request(app.getHttpServer())
                .post('/posts/' + genericIds.postId + '/comments')
                .send(comment)
                .expect(401)
        })
    })
})
