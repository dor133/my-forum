import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AppService } from '../services/app.service'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { Public } from '@app/auth/jwt-public'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return { user: req.user }
    }

    @Public()
    @Get()
    getHello(): string {
        return 'Hello World! From GCP'
    }
}
