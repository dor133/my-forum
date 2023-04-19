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

// export const useGetPostQuery = (id: string) => {
//     console.log(id)
//     const { data: post } = postsEndpoints.useGetPostQuery(id)
//     if (!post) return { post, user: undefined }
//     else return { post, user: useGetUserQuery(post.authorId) }
//     // const { data: user } = useGetUserQuery(post!.authorId)
//     // return { post, user }
// }

export const { useGetPostsQuery, useGetPostQuery } = postsEndpoints
