import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Connection, connect } from 'mongoose'

let mongod: MongoMemoryServer
let mongoConnection: Connection

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
    MongooseModule.forRootAsync({
        useFactory: async () => {
            mongod = await MongoMemoryServer.create()
            const mongoUri = await mongod.getUri()
            return {
                uri: mongoUri,
                ...options,
            }
        },
    })

export const createMongodConnection = async () => {
    if (mongod) {
        mongoConnection = (await connect(mongod.getUri())).connection
        return mongoConnection
    }
}

export const closeInMongodConnection = async () => {
    if (mongoConnection) {
        await mongoConnection.dropDatabase()
        await mongoConnection.close()
    }
    if (mongod) await mongod.stop()
}

export const clearDatabase = async () => {
    if (mongoConnection) {
        const collections = mongoConnection.collections
        for (const key in collections) {
            const collection = collections[key]
            await collection.deleteMany({})
        }
    }
}
