import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../axiosBaseQuery'

export const rtkApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'rtkAPi',
    tagTypes: ['Comments', 'UserPosts', 'Post', 'AllPosts', 'CommentLikes', 'UserCommentsLikes', 'PostLike'],
    endpoints: () => ({}),
})
