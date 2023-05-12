import { User, UserDocument } from '../../../../libs/models/src/users/user.schema'
import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

export class UsersFixtures extends Fixtures {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private reference: ReferenceRepository) {
        super()
    }

    async load(): Promise<void> {
        const users = []
        const password = 'password'
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        for (let i = 0; i < 1000; i++) {
            const user = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: hashedPassword,
                createdDate: faker.date.between('2021-01-01', '2023-04-28'),
            }
            users.push(user)
        }
        users.push({
            username: 'generic_user',
            email: 'mail@mail.com',
            password: hashedPassword,
            createdDate: Date.now(),
        })
        const documents = await this.userModel.insertMany(users)
        this.reference.addReference('Users', documents)
    }
}
