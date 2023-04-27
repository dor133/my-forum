export type UserLoginQueryPayload = {
    username: string
    password: string
}

export type UserLoginQueryData = {
    access_token: string
}

export type UserRegisterQueryPayload = {
    username: string
    password: string
    email: string
}

export type JWTPayload = {
    username: string
    sub: string
}

export type UserStoreType = {
    access_token: string | null
    payload: JWTPayload | null
    setCurrentUser: (token: string) => void
    logOut: () => void
}

export type PostQueryPayload = {
    title: string | undefined
    text: string | undefined
}

export type PostModifyQueryPayload = {
    id: string | undefined
    data: PostQueryPayload
}

export type PostDeleteQueryPayload = {
    ids: string[]
}

export type PostQueryData = {
    _id: string
    title: string
    text: string
    createdDate: Date
    author: UserQueryData
    like: PostLikeQueryData[]
}

export type UserQueryData = {
    _id: string
    username: string
    createdDate: Date
}

export type CommentQueryData = {
    _id: string
    text: string
    createdDate: Date
    author: UserQueryData
    postId: string
    likes: CommentLikeQueryData[]
}

export type CommentQueryPayload = {
    postId: string | undefined
    data: { text: string }
}

export type CommentDeleteQueryPayload = {
    postId: string | undefined
    id: string
}

export type CommentLikeQueryData = {
    userId: string
    commentId: string
}

export type CommentLikeQueryPayload = {
    postId: string | undefined
    id: string
}

export type PostLikeQueryPayload = {
    postId: string | undefined
}

export type PostLikeQueryData = {
    userId: string
    postId: string
}

export type LastPostsAnalyticsData = {
    lastWeekCount: number
    lastWeek2Count: number
    lastWeek3Count: number
    lastWeek4Count: number
}
