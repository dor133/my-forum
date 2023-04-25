import { rtkApi } from '..'
import { CommentDeleteQueryPayload, CommentQueryData, CommentQueryPayload, CommentLikeQueryPayload } from '../../../entities/security/types'

const commmentsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<CommentQueryData[], string>({
            query: (postId) => ({
                url: `posts/${postId}/comments`,
                method: 'GET',
            }),
            providesTags: ['Comments', 'Likes'],
        }),

        createComment: build.mutation<CommentQueryData, CommentQueryPayload>({
            query: ({ data, postId }) => ({
                url: `posts/${postId}/comments`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Comments'],
        }),

        deleteComment: build.mutation<string, CommentDeleteQueryPayload>({
            query: ({ postId, id }) => ({
                url: `posts/${postId}/comments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comments'],
        }),

        addLike: build.mutation<CommentQueryData, CommentLikeQueryPayload>({
            query: ({ postId, id }) => ({
                url: `posts/${postId}/comments/${id}/likes`,
                method: 'POST',
            }),
            invalidatesTags: ['Likes'],
        }),

        removeLike: build.mutation<CommentQueryData, CommentLikeQueryPayload>({
            query: ({ postId, id }) => ({
                url: `posts/${postId}/comments/${id}/likes`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Likes'],
        }),
    }),
})

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useAddLikeMutation, useRemoveLikeMutation } = commmentsEndpoints
