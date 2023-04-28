import { rtkApi } from '..'
import {
    PostDeleteQueryPayload,
    PostQueryData,
    PostQueryPayload,
    PostModifyQueryPayload,
    PostLikeQueryPayload,
    LastPostsAnalyticsData,
    MostActiveUsersAnalyticsData,
} from '../../../entities/security/types'

const postsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PostQueryData[], void>({
            query: () => ({
                url: 'posts',
                method: 'GET',
            }),
            providesTags: ['AllPosts'],
        }),

        getPost: build.query<PostQueryData, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET',
            }),
            providesTags: ['Post', 'PostLike'],
        }),

        createPost: build.mutation<PostQueryData, PostQueryPayload>({
            query: (data) => ({
                url: 'posts',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['UserPosts', 'AllPosts'],
        }),

        deletePost: build.mutation<string, PostDeleteQueryPayload>({
            query: (ids) => ({
                url: 'posts',
                method: 'DELETE',
                data: ids,
            }),
            invalidatesTags: ['UserPosts', 'AllPosts'],
        }),

        modifyPost: build.mutation<PostQueryData, PostModifyQueryPayload>({
            query: ({ id, data }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['UserPosts', 'Post', 'AllPosts'],
        }),

        addLike: build.mutation<PostQueryData, PostLikeQueryPayload>({
            query: ({ postId }) => ({
                url: `posts/${postId}/likes`,
                method: 'POST',
            }),
            invalidatesTags: ['PostLike'],
        }),

        removeLike: build.mutation<PostQueryData, PostLikeQueryPayload>({
            query: ({ postId }) => ({
                url: `posts/${postId}/likes`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PostLike'],
        }),

        getLastPostsAnalytics: build.query<LastPostsAnalyticsData, void>({
            query: () => ({
                url: 'posts/analytics/lastweeks',
                method: 'GET',
            }),
        }),

        getUserLastPostsAnalytics: build.query<LastPostsAnalyticsData, void>({
            query: () => ({
                url: 'posts/analytics/user/lastweeks',
                method: 'GET',
            }),
        }),

        getUserLastLikesAnalytics: build.query<LastPostsAnalyticsData, void>({
            query: () => ({
                url: 'posts/analytics/user/likes/',
                method: 'GET',
            }),
        }),

        getMostActiveUsersAnalytics: build.query<MostActiveUsersAnalyticsData[], void>({
            query: () => ({
                url: 'posts/analytics/mostactive',
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useModifyPostMutation,
    useAddLikeMutation,
    useRemoveLikeMutation,
    useGetLastPostsAnalyticsQuery,
    useGetUserLastPostsAnalyticsQuery,
    useGetUserLastLikesAnalyticsQuery,
    useGetMostActiveUsersAnalyticsQuery,
} = postsEndpoints
