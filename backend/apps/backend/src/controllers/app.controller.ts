import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AppService } from '../services/app.service'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
