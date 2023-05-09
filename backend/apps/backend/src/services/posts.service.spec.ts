import { faker } from '@faker-js/faker'
import { services, models } from '../../../../test-utils/jest/references'
import { ObjectId } from 'mongodb'
import e from 'express'

describe('PostsService', () => {
    it('should be defined', () => {
        expect(services.postsService).toBeDefined()
    })

    describe('posts retrieval', () => {
        it('should retrieve all posts', async () => {
            const posts = []
            for (let i = 0; i < 5; i++) {
                const post = {
                    title: faker.lorem.words(5),
                    content: faker.lorem.paragraphs(1),
                    author: faker.database.mongodbObjectId(),
                    createdDate: faker.date.between('2021-01-01', '2023-04-28'),
                }
                posts.push(post)
            }
            await models.postModel.insertMany(posts)
            const documents = await models.postModel.find({}, { _id: 1, title: 1, createdDate: 1 }).sort({ createdDate: 'descending' }).exec()

            const retrievedPosts = await services.postsService.findAll(1)
            expect(retrievedPosts).toEqual(documents)
        })

        it('should retrieve a post with title matching search term', async () => {
            const posts = [
                {
                    title: 'post 1',
                    content: 'content',
                    author: faker.database.mongodbObjectId(),
                },
                {
                    title: 'matching post 1',
                    content: 'content',
                    author: faker.database.mongodbObjectId(),
                },
                {
                    title: 'matching post 2',
                    content: 'content',
                    author: faker.database.mongodbObjectId(),
                },
            ]
            await models.postModel.insertMany(posts)
            // const documents = await models.postModel.find({ title: { $regex: "match", $options: "i" } }, { _id: 1, title: 1, createdDate: 1 }).sort({ createdDate: 'descending' }).exec()

            const retrievedPosts = await services.postsService.findAll(1, 'match')
            expect(retrievedPosts).toMatchObject([{ title: 'matching post 1' }, { title: 'matching post 2' }])
        })

        it('should return an empty array if no posts are found', async () => {
            const retrievedPosts = await services.postsService.findAll(1, 'match')
            expect(retrievedPosts).toEqual([])
        })

        it('should return the post with the given id', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const userDocument = await models.userModel.create(user)
            const userId = userDocument._id.toString()
            const post = {
                title: faker.lorem.words(5),
                content: faker.lorem.paragraphs(1),
                author: userId,
            }
            const postDocument = await models.postModel.create(post)
            const postId = postDocument._id.toString()

            const retrievedPost = await services.postsService.findOneById(postId, userId)
            expect(retrievedPost).toMatchObject({ _id: new ObjectId(postId) })
        })

        it('should return 2 pages', async () => {
            const posts = []
            for (let i = 0; i < 11; i++) {
                const post = {
                    title: faker.lorem.words(5),
                    content: faker.lorem.paragraphs(1),
                    author: faker.database.mongodbObjectId(),
                    createdDate: faker.date.between('2021-01-01', '2023-04-28'),
                }
                posts.push(post)
            }
            await models.postModel.insertMany(posts)

            const nbOfPosts = await services.postsService.getNumberOfPages()
            expect(nbOfPosts).toEqual(2)
        })
    })

    describe('post creation', () => {
        it('should create a post', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const userDocument = await models.userModel.create(user)
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
            }
            const createdPost = await services.postsService.create(post, userDocument._id.toString())
            const dbPost = await models.postModel.findById(createdPost._id).exec()
            expect(dbPost).toMatchObject(post)
        })
    })

    describe('post update', () => {
        it('should return the post with title and content updated', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: 'password',
            }
            const userDocument = await models.userModel.create(user)
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
                author: userDocument._id.toString(),
            }
            const postDocument = await models.postModel.create(post)

            const updatedPost = await services.postsService.update(
                { title: 'updated title', text: 'updated content' },
                postDocument._id.toString(),
                userDocument._id.toString()
            )

            const dbPost = await models.postModel.findById(postDocument._id).exec()
            expect(dbPost).toMatchObject({ title: 'updated title', text: 'updated content' })
        })

        it('should throw an error if you ar not the owner', async () => {
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
                author: faker.database.mongodbObjectId(),
            }
            const document = await models.postModel.create(post)

            await expect(async () => {
                await services.postsService.update({ title: 'updated title' }, document._id.toString(), faker.database.mongodbObjectId())
            }).rejects.toThrow()
        })
    })

    describe('post deletion', () => {
        it('should delete the posts', async () => {
            const id = faker.database.mongodbObjectId()
            const posts = [
                {
                    title: faker.lorem.words(5),
                    text: faker.lorem.paragraphs(1),
                    author: id,
                },
                {
                    title: faker.lorem.words(5),
                    text: faker.lorem.paragraphs(1),
                    author: id,
                },
            ]
            const documents = await models.postModel.insertMany(posts)
            const ids = documents.map((document) => document._id.toString())
            await services.postsService.delete(ids, id)

            const dbPosts = await models.postModel.find({ _id: { $in: ids } }).exec()
            expect(dbPosts).toEqual([])
        })

        it('should throw an error if you are not the owner', async () => {
            const id = faker.database.mongodbObjectId()
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
                author: id,
            }
            const document = await models.postModel.create(post)

            await expect(async () => {
                await services.postsService.delete([document._id.toString()], faker.database.mongodbObjectId())
            }).rejects.toThrow()
        })
    })

    describe('post likes', () => {
        it('should add a like to the post', async () => {
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
                author: faker.database.mongodbObjectId(),
            }
            const document = await models.postModel.create(post)
            const userId = new ObjectId(faker.database.mongodbObjectId())
            await services.postsService.addLike(document._id.toString(), userId.toString())

            const dbLikes = await models.postLikeModel.find({ postId: document._id.toString() }).exec()
            expect(dbLikes).toMatchObject([{ userId: userId, postId: document._id }])
        })

        it('should throw an error if you already liked the post', async () => {
            const post = {
                title: faker.lorem.words(5),
                text: faker.lorem.paragraphs(1),
                author: faker.database.mongodbObjectId(),
            }
            const document = await models.postModel.create(post)
            const userId = faker.database.mongodbObjectId()
            await models.postLikeModel.create({ userId: userId, postId: document._id.toString() })

            await expect(async () => {
                await services.postsService.addLike(document._id.toString(), userId)
                console.log(await models.postLikeModel.find().exec())
            }).rejects.toThrow()
        })
    })
})
