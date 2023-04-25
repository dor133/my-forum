import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './jwt-public'
import decode from 'jwt-decode'

type JWTPayload = {
    username: string
    sub: string
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        if (isPublic) {
            const request = context.switchToHttp().getRequest()
            const authorization = request.headers.authorization
            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                const token = authorization.split(' ')[1]
                const payload = decode<JWTPayload>(token)
                request.user = { username: payload.username, userId: payload.sub }
            }
            return true
        }
        return super.canActivate(context)
    }
}
