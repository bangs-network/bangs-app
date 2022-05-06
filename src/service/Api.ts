import { request } from './request'

//Home
export const LoginApi = <T>(params: any) => request.get<T>('/verse/home', params, {timeout: 15000});