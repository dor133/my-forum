import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from '@app/users'

describe('UsersController', () => {
    let usersController: UsersController
    let usersService: UsersService

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile()

        usersController = moduleRef.get<UsersController>(UsersController)
        usersService = moduleRef.get<UsersService>(UsersService)
    })

    describe('getUser', () => {
        it('should return the user Jayne.Huels23', async () => {
            // let result = new User()
            const result = {
                _id: '6450c3407548514a2d9d7833',
                username: 'Jayne.Huels23',
                createdDate: new Date('2023-03-25T03:43:35.034Z'),
            }
            expect(await usersController.getUser({ id: '6450c3407548514a2d9d7833' })).toBe(result)
        })
    })
})
