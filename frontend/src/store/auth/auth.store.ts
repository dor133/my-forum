import { create } from 'zustand'
import { JWTPayload, UserStoreType } from '../../entities/security/types'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import decode from 'jwt-decode'

const useAuthStore = create<UserStoreType, [['zustand/immer', never], ['zustand/persist', never]]>(
    // Immer middleware is optional for zustand stores but makes it easier to deal with state, as it allows to mutate the state directly
    // Without immer we wouldn't be able to do statements like that : "state.payload = payload"
    immer(
        // Persist middleware stores its state within an async storage. For our case it uses the navigator localStorage.
        // It will save the access_token upon multiple window refreshs, so no need to re-log the user everytime. It is a kind of "remember me" feature
        persist(
            (set) => ({
                access_token: null,
                payload: null,
                setCurrentUser: (token) =>
                    set((state) => {
                        const payload = decode<JWTPayload>(token)
                        state.access_token = token
                        state.payload = payload
                    }),
                logOut: () =>
                    set((state) => {
                        state.access_token = null
                        state.payload = null
                    }),
            }),
            {
                name: 'access_token',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)

export default useAuthStore
