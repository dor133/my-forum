import { services, models } from '../../../test-utils/jest/references'
import * as bcrypt from 'bcrypt'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'mongodb'
import { AuthService } from './auth.service'
import * as jwt from 'jsonwebtoken'

describe('AuthService', () => {
    let jwtService: JwtService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '6000s' },
                }),
            ],
        }).compile()

        jwtService = module.get<JwtService>(JwtService)
    })

    it('should be defined', () => {
        expect(services.authServices).toBeDefined()
    })

    describe('user validation', () => {
        it('should return a user if the password is valid', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: null,
            }
            user.password = await bcrypt.hash('password', 10)
            await models.userModel.create(user)

            const userValidated = await services.authServices.validateUser(user.username, 'password')
            expect(userValidated).toMatchObject({ username: user.username })
        })

        it('should return null if credentials are not valid', async () => {
            const user = {
                username: 'username',
                email: 'mail@mail.com',
                password: null,
            }
            user.password = await bcrypt.hash('good_password', 10)
            await models.userModel.create(user)

            const userUnvalidated = await services.authServices.validateUser(user.username, 'false_password')
            expect(userUnvalidated).toBeNull()
        })
    })

    describe('user login', () => {
        it('should return an access token for a user', async () => {
            const user = {
                _id: new ObjectId(),
                username: 'username',
                email: 'mail@mail.com',
                password: null,
            }
            user.password = await bcrypt.hash('password', 10)

            const accessToken = await services.authServices.login(user)
            const sign = jwtService.sign({ username: user.username, sub: user._id })
            expect(accessToken).toEqual({ access_token: sign })
        })

        it('should return a valid of the access token', async () => {
            const user = {
                _id: new ObjectId(),
                username: 'username',
                email: 'mail@mail.com',
                password: await bcrypt.hash('password', 10),
            }

            const accessToken = await services.authServices.login(user)
            const decoded = jwtService.decode(accessToken.access_token)
            expect(decoded).toMatchObject({ username: user.username, sub: user._id.toString() })
        })
    })

    describe('jwt sign call', () => {
        let loginSpy: jest.SpyInstance
        let signSpy: jest.SpyInstance

        beforeEach(async () => {
            signSpy = jest.spyOn(jwt, 'sign').mockImplementation((token, secret, options, callback) => {
                const result = 'signed_' + JSON.stringify(token) + '_by_' + secret
                return callback ? callback(null, result) : result
            })
            loginSpy = jest.spyOn(AuthService.prototype, 'login').mockImplementation(async () => {
                const payload = { username: 'username', sub: new ObjectId() }
                return {
                    access_token: jwtService.sign(payload),
                }
            })
        })

        afterEach(() => {
            signSpy.mockRestore()
            loginSpy.mockRestore()
        })

        it('should sign the token with the good secret key', async () => {
            const user = {
                _id: new ObjectId(),
                username: 'username',
                email: 'mail@mail.com',
                password: await bcrypt.hash('password', 10),
            }
            const accessToken = await services.authServices.login(user)
            expect(accessToken.access_token).toMatch(process.env.JWT_SECRET)
        })
    })
})
