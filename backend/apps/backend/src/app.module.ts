import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'
import { UsersController } from './controllers/users.controller'
import { User, UserSchema } from '@app/models/users/user.schema'
import { AuthController } from './controllers/auth.controller'
import { UsersModule } from '@app/users'
import { AuthModule } from '@app/auth'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'my-forum' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController, UsersController, AuthController],
    providers: [AppService],
})
export class AppModule {}
