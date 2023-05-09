import * as bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { services, models } from '../../../test-utils/jest/references'

describe('UsersService', () => {
    it('should be defined', () => {
        expect(services.usersService).toBeDefined()
    })

    describe('user creation', () => {
        const userData = {
            username: 'test_user',
            email: 'mail@mail.com',
            password: 'password',
        }

        it('should create a valid hashed password', async () => {
            const user = await services.usersService.create(userData)
            expect(await bcrypt.compare(userData.password, user.password)).toBe(true)
        })

        it('should create a user', async () => {
            let user = await services.usersService.create(userData)
            delete userData.password
            expect(user).toMatchObject(userData)
        })
    })

    describe('user retrieval', () => {
        it('should retrieve all users', async () => {
            const users = []
            const password = 'password'
            const salt = 10
            for (let i = 0; i < 10; i++) {
                const user = {
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: await bcrypt.hash(password, salt),
                    createdDate: faker.date.between('2021-01-01', '2023-04-28'),
                }
                users.push(user)
            }
            await models.userModel.insertMany(users)
            const documents = await models.userModel.find().exec()

            const retrievedUsers = await services.usersService.findAll()
            expect(retrievedUsers).toEqual(documents)
        })

        it('should throw an error if no users are found', async () => {
            const fakeId = faker.database.mongodbObjectId()
            await expect(async () => {
                await services.usersService.findOneById(fakeId)
            }).rejects.toThrow()
        })
    })

    describe('user update', () => {
        it('should return the user updated', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const document = await models.userModel.create(user)
            const userId = document._id.toString()

            await services.usersService.update({ username: 'newUsername' }, userId, userId)
            const modifiedUser = await models.userModel.findById(userId).exec()
            expect(modifiedUser).toMatchObject({ username: 'newUsername' })
        })

        it('should not have the permission to modify', async () => {
            const users = [
                {
                    username: 'username_1',
                    email: 'mail@mail.com',
                    password: 'password',
                },
                {
                    username: 'username_2',
                    email: 'mail@mail.com',
                    password: 'password',
                },
            ]
            const documents = await models.userModel.insertMany(users)
            const user1Id = documents[0]._id.toString()
            const user2Id = documents[1]._id.toString()
            expect(async () => {
                await services.usersService.update({ username: 'newUsername' }, user1Id, user2Id)
            }).rejects.toThrow("You don't have permission to edit this user")
        })
    })

    describe("user's posts informations", () => {
        it('should return the user posts', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const document = await models.userModel.create(user)
            const userId = document._id.toString()

            const posts = [
                {
                    title: 'post_1',
                    content: 'content',
                    author: userId,
                },
                {
                    title: 'post_2',
                    content: 'content',
                    author: userId,
                },
                {
                    title: 'post_3',
                    content: 'content',
                    author: userId,
                },
            ]
            await models.postModel.insertMany(posts)
            const postsId = await models.postModel.find({ author: userId }, { _id: 1 }).exec()

            const userPosts = await services.usersService.findPosts(userId)
            expect(userPosts).toMatchObject(postsId)
        })

        it('should return an empty object if no posts are found', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const document = await models.userModel.create(user)
            const userId = document._id.toString()

            expect(await services.usersService.findPosts(userId)).toEqual([])
        })
    })

    describe("user's comments informations", () => {
        it('should return the user comments', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const document = await models.userModel.create(user)
            const userId = document._id.toString()

            const posts = [
                {
                    title: 'post_1',
                    content: 'content',
                    author: userId,
                },
                {
                    title: 'post_2',
                    content: 'content',
                    author: userId,
                },
            ]
            const documents = await models.postModel.insertMany(posts)
            const postsId = documents.map((post) => post._id.toString())

            const comments = [
                {
                    content: 'content',
                    postId: postsId[0],
                    author: userId,
                },
                {
                    content: 'content',
                    postId: postsId[1],
                    author: userId,
                },
            ]
            await models.commentModel.insertMany(comments)
            const commentsId = await models.commentModel.find({ author: userId }, { _id: 1 }).exec()

            const userComments = await services.usersService.findComments(userId)
            expect(userComments).toMatchObject(commentsId)
        })

        it('should return an empty object if no comments are found', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const document = await models.userModel.create(user)
            const userId = document._id.toString()

            expect(await services.usersService.findComments(userId)).toEqual([])
        })
    })
})
