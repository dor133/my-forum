import { Model } from 'mongoose'
import { User } from '@app/models/users/user.schema'
import { PostForum } from '@app/models/posts/post.schema'
import { Comment } from '@app/models/comments/comment.schema'
import { UsersService } from '@app/users'
import { PostsService } from '../../apps/backend/src/services/posts.service'
import { CommentsService } from '../../apps/backend/src/services/comments.service'
import { CommentLike } from '@app/models/likes/commentsLikes/commentLike.schema'
import { PostLike } from '@app/models/likes/postsLikes/postLike.schema'
import { UsersController } from '../../apps/backend/src/controllers/users.controller'
import { PostsController } from '../../apps/backend/src/controllers/posts.controller'
import { CommentsController } from '../../apps/backend/src/controllers/comments.controller'
import { AuthService } from '@app/auth'
import { AuthController } from '../../apps/backend/src/controllers/auth.controller'

type Services = {
    usersService: UsersService
    postsService: PostsService
    commentsService: CommentsService
    authServices: AuthService
}

type Controllers = {
    usersController: UsersController
    postsController: PostsController
    commentsController: CommentsController
    authController: AuthController
}

type Models = {
    userModel: Model<User>
    postModel: Model<PostForum>
    commentModel: Model<Comment>
    commentLikeModel: Model<CommentLike>
    postLikeModel: Model<PostLike>
}

export const services: Services = {
    usersService: null,
    postsService: null,
    commentsService: null,
    authServices: null,
}

export const controllers: Controllers = {
    usersController: null,
    postsController: null,
    commentsController: null,
    authController: null,
}

export const models: Models = {
    userModel: null,
    postModel: null,
    commentModel: null,
    commentLikeModel: null,
    postLikeModel: null,
}
