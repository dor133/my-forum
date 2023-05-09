import * as bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { controllers, models } from '../../../../test-utils/jest/references'

describe('UsersController (/users/)', () => {
    it('should be defined', () => {
        expect(controllers.usersController).toBeDefined()
    })

    describe('user creation (POST /)', () => {
        it('should create a user', async () => {
            const userData = {
                username: 'test_user',
                email: 'mail@mail.com',
                password: 'password',
            }
            const createdUser = await controllers.usersController.postUser(userData)

            const dbUser = await models.userModel.findOne({ username: userData.username }).exec()
            expect(createdUser).toMatchObject(dbUser?.toObject())
        })

        it('should throw an error if user already exists', async () => {
            const userData = {
                username: 'test_user',
                email: 'mail@mail.com',
                password: 'password',
            }
            await models.userModel.create(userData)
            await expect(async () => {
                await controllers.usersController.postUser(userData)
            }).rejects.toThrow()
        })
    })

    describe('user retrieval (GET /)', () => {
        it('should retrieve all users', async () => {
            const users = []
            const password = 'password'
            const salt = 10
            for (let i = 0; i < 3; i++) {
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

            const retrievedUsers = await controllers.usersController.getUsers()
            // console.log(documents.length)
            expect(retrievedUsers).toMatchObject(documents)
        })

        // it('should retrieve a user by id', async () => {
        //     const userData = {
        //         username: 'test_user',
        //         email: 'mail@mail.com',
        //         password: 'password',
        //     }
        //     const createdUser = await models.userModel.create(userData)

        //     const retrievedUser = await controllers.usersController.getUser({ id: createdUser._id.toString() })
        //     expect(retrievedUser).toEqual(createdUser)
        // })
    })
})
