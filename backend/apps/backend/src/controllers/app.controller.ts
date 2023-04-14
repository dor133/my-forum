import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { AppService } from '../services/app.service'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile() {
        return 'Authenticated !'
    }
}
