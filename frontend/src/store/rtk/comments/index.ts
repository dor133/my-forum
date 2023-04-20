import { rtkApi } from '..'
import { CommentQueryData, CommentQueryPayload } from '../../../entities/security/types'

const commmentsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<CommentQueryData[], string>({
            query: (postId) => ({
                url: `posts/${postId}/comments`,
                method: 'GET',
            }),
            providesTags: ['Comments'],
        }),

        createComment: build.mutation<CommentQueryData, CommentQueryPayload>({
            query: ({ data, postId }) => ({
                url: `posts/${postId}/comments`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
})

export const { useGetCommentsQuery, useCreateCommentMutation } = commmentsEndpoints
