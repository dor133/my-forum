import { rtkApi } from '..'
import { CommentQueryData } from '../../../entities/security/types'

const commmentsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getComments: build.query<CommentQueryData[], string>({
            query: (postId) => ({
                url: `posts/${postId}/comments`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetCommentsQuery } = commmentsEndpoints
