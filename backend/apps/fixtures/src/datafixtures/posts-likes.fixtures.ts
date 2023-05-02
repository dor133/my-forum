import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { InjectModel } from '@nestjs/mongoose'
import { PostLike, PostLikeDocument } from '../../../../libs/models/src/likes/postsLikes/postLike.schema'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'

export class PostsLikesFixtures extends Fixtures {
    constructor(@InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>, private reference: ReferenceRepository) {
        super()
    }

    getDependencies(): string[] {
        return ['UsersFixtures', 'PostsFixtures']
    }

    async load(): Promise<void> {
        const users = this.reference.getReference('Users')
        const posts = this.reference.getReference('Posts')
        const likes = []
        for (let i = 0; i < 5000; i++) {
            const like = {
                userId: users[Math.floor(Math.random() * users.length)]._id,
                postId: posts[Math.floor(Math.random() * posts.length)]._id,
                createdDate: faker.date.between('2023-04-01', '2023-05-02'),
            }
            likes.push(like)
        }
        const documents = await this.postLikeModel.insertMany(likes)
    }
}
