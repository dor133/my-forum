import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { InjectModel } from '@nestjs/mongoose'
import { CommentLike, CommentLikeDocument } from '../../../../libs/models/src/likes/commentsLikes/commentLike.schema'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'

export class CommentsLikesFixtures extends Fixtures {
    constructor(@InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>, private reference: ReferenceRepository) {
        super()
    }

    getDependencies(): string[] {
        return ['UsersFixtures', 'CommentsFixtures']
    }

    async load(): Promise<void> {
        // const users = this.reference.getReference('Users')
        // const comments = this.reference.getReference('Comments')
        // const likes = []
        // for (let i = 0; i < 5000; i++) {
        //     const like = {
        //         userId: users[Math.floor(Math.random() * users.length)]._id,
        //         commentId: comments[Math.floor(Math.random() * comments.length)]._id,
        //         createdDate: faker.date.between('2023-04-01', '2023-05-02'),
        //     }
        //     likes.push(like)
        // }
        // const documents = await this.commentLikeModel.insertMany(likes)
    }
}
