import { rtkApi } from '..'
import { PostDeleteQueryPayload, PostQueryData, PostQueryPayload, PostModifyQueryPayload } from '../../../entities/security/types'

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
            providesTags: ['Post'],
        }),

        createPost: build.mutation<PostQueryData, PostQueryPayload>({
            query: (data) => ({
                url: 'posts',
                method: 'POST',
                data,
            }),
        }),

        deletePost: build.mutation<string, PostDeleteQueryPayload>({
            query: (ids) => ({
                url: 'posts',
                method: 'DELETE',
                data: ids,
            }),
            invalidatesTags: ['UserPosts'],
        }),

        modifyPost: build.mutation<PostQueryData, PostModifyQueryPayload>({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['UserPosts', 'Post'],
        }),
    }),
})

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation, useDeletePostMutation, useModifyPostMutation } = postsEndpoints
