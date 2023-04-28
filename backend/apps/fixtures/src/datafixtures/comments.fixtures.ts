import { CommentDocument, Comment } from '../../../../libs/models/src/comments/comment.schema'
import { Fixtures, ReferenceRepository } from '@dauflo/nest-fixtures'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument } from '../../../../libs/models/src/users/user.schema'
import { PostForumDocument } from '../../../../libs/models/src/posts/post.schema'
import { Model } from 'mongoose'
import { faker } from '@faker-js/faker'

export class CommentsFixtures extends Fixtures {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private reference: ReferenceRepository) {
        super()
    }

    getDependencies(): string[] {
        return ['UsersFixtures', 'PostsFixtures']
    }

    async load(): Promise<void> {
        const users = this.reference.getReference<UserDocument[]>('Users')
        const posts = this.reference.getReference<PostForumDocument[]>('Posts')
        const comments = []
        for (let i = 0; i < 10000; i++) {
            const post = {
                text: faker.lorem.sentences(Math.floor(Math.random() * 10) + 1),
                author: users[Math.floor(Math.random() * users.length)]._id,
                postId: posts[Math.floor(Math.random() * posts.length)]._id,
                createdDate: faker.date.between('2021-01-01', '2023-04-28'),
            }
            comments.push(post)
        }
        const documents = await this.commentModel.insertMany(comments)
    }
}
