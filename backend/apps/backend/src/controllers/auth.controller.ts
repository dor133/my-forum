import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from '@app/auth'
import { LocalAuthGuard } from '@app/auth/local-auth.guard'
import { Public } from '@app/auth/jwt-public'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
