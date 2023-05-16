import { CommandFactory } from 'nest-commander'
import { FixturesModule } from './fixtures.module'

async function bootstrap() {
    const start_time = Date.now()
    console.log('Creating database ' + process.env.MONGO_RANDOM_ID)
    await CommandFactory.run(FixturesModule)
    console.log('Database created')
    console.log('Duration: ' + (Date.now() - start_time) / 1000 + 's')
}
bootstrap()
