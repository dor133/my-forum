import { rtkApi } from '..'
import { PostQueryData } from '../../../entities/security/types'
import { useGetUserQuery } from '../users'

const postsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PostQueryData[], void>({
            query: () => ({
                url: 'posts',
                method: 'GET',
            }),
        }),
        getPost: build.query<PostQueryData, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetPostsQuery, useGetPostQuery } = postsEndpoints
