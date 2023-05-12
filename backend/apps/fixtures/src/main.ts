import { CommandFactory } from 'nest-commander'
import { FixturesModule } from './fixtures.module'

async function bootstrap() {
    console.log('Creating database ' + process.env.MONGO_RANDOM_ID)
    await CommandFactory.run(FixturesModule)
    console.log('Database created')
}
bootstrap()
