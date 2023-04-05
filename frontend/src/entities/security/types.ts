export type UserLoginQueryPayload = {
    email: string
    password: string
}

export type UserLoginQueryData = {
    access_token: string
}

export type JWTPayload = {
    _id: string
}

export type UserStoreType = {
    access_token: string | null
    payload: JWTPayload | null
    setCurrentUser: (token: string) => void
    logOut: () => void
}
