import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from '@app/users/users.service'
import { UsersController } from './controllers/users.controller'
import { User, UserSchema } from '@app/models/users/user.schema'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://mdore:FjfrjcxKYfHowB0h@my-forum.48ponwu.mongodb.net/?retryWrites=true&w=majority', { dbName: 'my-forum' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService],
})
export class AppModule {}
