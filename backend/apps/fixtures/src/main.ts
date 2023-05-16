import { CommandFactory } from 'nest-commander'
import { FixturesModule } from './fixtures.module'
import { connect } from 'mongoose'

async function bootstrap() {
    console.log('test: try connect to mongo')
    const uri = process.env.MONGO_URI + '/' + process.env.MONGO_RANDOM_ID
    console.log(uri)
    const db = (await connect(uri)).connection
    console.log('test: connected to mongo')

    // const start_time = Date.now()
    // console.log('Creating database ' + process.env.MONGO_RANDOM_ID)
    // await CommandFactory.run(FixturesModule)
    // console.log('Database created')
    // console.log('Duration: ' + (Date.now() - start_time) / 1000 + 's')
}
bootstrap()
