import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './controllers/users.controller'
import { User, UserSchema } from '@app/models/users/user.schema'
import { AuthController } from './controllers/auth.controller'
import { UsersModule } from '@app/users'
import { AuthModule } from '@app/auth'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://mdore:FjfrjcxKYfHowB0h@my-forum.48ponwu.mongodb.net/?retryWrites=true&w=majority', { dbName: 'my-forum' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController, UsersController, AuthController],
    providers: [AppService],
})
export class AppModule {}
