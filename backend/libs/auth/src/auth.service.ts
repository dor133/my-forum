import { UsersService } from '@app/users'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        const isMatch = await bcrypt.compare(password, user.password)
        if (user && isMatch) {
            const { username, _id } = user
            return { username, _id }
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
