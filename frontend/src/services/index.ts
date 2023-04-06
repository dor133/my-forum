import axios from 'axios'
import useAuthStore from '../store/auth/auth.store'

const api = axios.create({
    baseURL: process.env.REACT_APP_API ?? 'http://localhost:8080',
})

// Interceptors are pieces of code that are executed before or after every HTTP requests made with Axios
// Here, before every HTTP request that is going to be sent, we take the access_token from the auth store,
// and we add it to the request as an HTTP header, so that the server knows who made the request
api.interceptors.request.use(
    async (config) => {
        const state = useAuthStore.getState()
        if (state.access_token) {
            if (config.headers) {
                config.headers['Authorization'] = `Bearer ${state.access_token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
