import { PostForum, PostForumDocument } from '../../../../libs/models/src/posts/post.schema'
import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument } from '../../../../libs/models/src/users/user.schema'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'

export class PostsFixtures extends Fixtures {
    constructor(@InjectModel(PostForum.name) private postModel: Model<PostForumDocument>, private reference: ReferenceRepository) {
        super()
    }

    getDependencies(): string[] {
        return ['UsersFixtures']
    }

    async load(): Promise<void> {
        const users = this.reference.getReference<UserDocument[]>('Users')
        const posts = []
        for (let i = 0; i < 10000; i++) {
            const post = {
                title: faker.lorem.sentence(5),
                text: faker.lorem.paragraphs(Math.floor(Math.random() * 10) + 1),
                author: users[Math.floor(Math.random() * users.length)]._id,
                createdDate: faker.date.between('2021-01-01', '2023-04-28'),
            }
            posts.push(post)
        }
        const documents = await this.postModel.insertMany(posts)
        this.reference.addReference('Posts', documents)
    }
}
