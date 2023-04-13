import { UsersService } from '@app/users'
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    // async SignIn(username: string, password: string): Promise<any> {
    //     const user = await this.usersService.findOne(username)
    //     console.log(user)
    //     const isMatch = await bcrypt.compare(password, user.password)
    //     if (!isMatch) {
    //         throw new UnauthorizedException('Invalid credentials')
    //     }
    // const payload = { username: user.username, sub: user._id }
    // }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        const isMatch = await bcrypt.compare(password, user.password)
        if (user && isMatch) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}
