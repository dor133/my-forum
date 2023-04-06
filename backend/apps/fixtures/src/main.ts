import { CommandFactory } from 'nest-commander'
import { FixturesModule } from './fixtures.module'

async function bootstrap() {
    await CommandFactory.run(FixturesModule)
}
bootstrap()
