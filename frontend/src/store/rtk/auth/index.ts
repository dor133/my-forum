import { rtkApi } from '..'
import { UserLoginQueryData, UserLoginQueryPayload } from '../../../entities/security/types'
import useAuthStore from '../../auth/auth.store'

const authEndpoints = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserLoginQueryData, UserLoginQueryPayload>({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                data,
            }),
            onCacheEntryAdded: async (_arg, { cacheDataLoaded, cacheEntryRemoved }) => {
                try {
                    // wait for the initial query to resolve before proceeding
                    const { data } = await cacheDataLoaded
                    // access_token is store within the authStore so that it can be accessed everywhere
                    useAuthStore.getState().setCurrentUser(data.access_token)
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved
            },
        }),
    }),
})

export const { useLoginMutation } = authEndpoints
