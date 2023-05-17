import { Module } from '@nestjs/common'
import { FixturesModule as FixturesModuleProvider, FixturesCommand } from '@dauflo/nest-fixtures'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        // Insert database connection module before FixturesModuleProvider
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'fixtures-test' }),
        FixturesModuleProvider.forRootAsyncMonorepo('apps/fixtures/src/datafixtures/*.fixtures.ts', 'libs/models/**/*.schema.ts', 'discriminators', 'fixtures'),
    ],
    providers: [FixturesCommand],
})
export class FixturesModule {}
