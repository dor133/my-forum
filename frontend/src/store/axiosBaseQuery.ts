import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { AxiosError, AxiosRequestConfig } from 'axios'
import api from '../services'

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, ...extraConfig }) => {
        try {
            const result = await api({ ...extraConfig, url, method, data })
            return { data: result.data }
        } catch (axiosError) {
            let err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export default axiosBaseQuery
