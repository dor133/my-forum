import { CommandFactory } from 'nest-commander'
import { FixturesModule, DbId } from './fixtures.module'

async function bootstrap() {
    console.log('Creating database ')
    await CommandFactory.run(FixturesModule)
    console.log('Database created')
}
bootstrap()
