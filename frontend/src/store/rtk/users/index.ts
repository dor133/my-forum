import { rtkApi } from '..'
import { UserQueryData } from '../../../entities/security/types'

const usersEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<UserQueryData[], void>({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
        }),

        getUser: build.query<UserQueryData, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetUsersQuery, useGetUserQuery } = usersEndpoints
