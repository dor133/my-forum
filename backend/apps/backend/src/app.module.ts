import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { AppService } from './services/app.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://mdore:FjfrjcxKYfHowB0h@my-forum.48ponwu.mongodb.net/?retryWrites=true&w=majority')],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
