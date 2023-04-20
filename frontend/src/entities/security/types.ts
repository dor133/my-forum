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

export type PostQueryData = {
    _id: string
    title: string
    text: string
    createdDate: Date
    authorId: string
}

export type UserQueryData = {
    _id: string
    username: string
}

export type CommentQueryData = {
    _id: string
    text: string
    createdDate: Date
    author: UserQueryData
    postId: string
}
