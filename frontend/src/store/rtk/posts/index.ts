import { rtkApi } from '..'
import { PostDeleteQueryPayload, PostQueryData, PostQueryPayload } from '../../../entities/security/types'

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

        createPost: build.mutation<PostQueryData, PostQueryPayload>({
            query: (data) => ({
                url: 'posts',
                method: 'POST',
                data,
            }),
        }),

        deletePost: build.mutation<string, PostDeleteQueryPayload[]>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation, useDeletePostMutation } = postsEndpoints
