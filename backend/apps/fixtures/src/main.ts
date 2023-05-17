import { CommandFactory } from 'nest-commander'
import { FixturesModule } from './fixtures.module'

async function bootstrap() {
    const start_time = Date.now()
    console.log('Adding fixtures to database on ' + process.env.MONGO_URI)
    await CommandFactory.run(FixturesModule)
    console.log('End of script')
    console.log('Duration: ' + (Date.now() - start_time) / 1000 + 's')
}
bootstrap()
