import { rtkApi } from '..'
import { PostQueryData } from '../../../entities/security/types'

const postsEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PostQueryData[], void>({
            query: () => ({
                url: 'posts',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetPostsQuery } = postsEndpoints
