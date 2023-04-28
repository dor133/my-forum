import { User, UserDocument } from '../../../../libs/models/src/users/user.schema'
import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

export class FooFixtures extends Fixtures {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>, private reference: ReferenceRepository) {
        super()
    }

    async load(): Promise<void> {
        console.log('hey')
        const documents = await this.model.insertMany([{ username: 'test' }])
    }
}
