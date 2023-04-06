import { Module } from '@nestjs/common'
import { FixturesModule as FixturesModuleProvider, FixturesCommand } from '@dauflo/nest-fixtures'

@Module({
    imports: [
        // Insert database connection module before FixturesModuleProvider
        FixturesModuleProvider.forRootAsyncMonorepo(
            'apps/fixtures/src/datafixtures/*.fixtures.ts',
            'libs/entities/**/*.schema.ts',
            'discriminators',
            'fixtures'
        ),
    ],
    providers: [FixturesCommand],
})
export class FixturesModule {}
