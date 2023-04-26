import { rtkApi } from '..'
import { CommentQueryData, PostQueryData, UserQueryData } from '../../../entities/security/types'

const usersEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<UserQueryData[], void>({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
        }),

        getUser: build.query<UserQueryData, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
            }),
        }),

        getUserPosts: build.query<PostQueryData[], string>({
            query: (id) => ({
                url: `users/${id}/posts`,
                method: 'GET',
            }),
            providesTags: ['UserPosts'],
        }),

        getUserComments: build.query<CommentQueryData[], string>({
            query: (id) => ({
                url: `users/${id}/comments`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetUsersQuery, useGetUserQuery, useGetUserPostsQuery, useGetUserCommentsQuery } = usersEndpoints
