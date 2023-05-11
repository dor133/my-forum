import { LocalAuthGuard } from './local-auth.guard'
import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import * as bcrypt from 'bcrypt'
import { models } from '../../../test-utils/jest/references'

describe('LocalAuthGuard', () => {
    let localAuthGuard: LocalAuthGuard

    beforeAll(() => {
        localAuthGuard = new LocalAuthGuard()
    })

    it('should be defined', () => {
        expect(localAuthGuard).toBeDefined()
    })

    describe('canActivate', () => {
        it('should return true when user is authenticated', async () => {
            const user = {
                username: 'username',
                password: await bcrypt.hash('password', 10),
            }
            await models.userModel.create(user)
            user.password = 'password'

            const mockContext = createMock<ExecutionContext>()
            mockContext.switchToHttp().getRequest.mockReturnValue({
                isAuthenticated: () => true,
            })

            expect(localAuthGuard.canActivate(mockContext)).toBeTruthy()
        })

        // it('should throw an error when user is not authenticated', () => {

        // })
    })

    // describe('guard test', () => {
    //     it('should go through the guard when login', () => {

    //     })
    // })
})
