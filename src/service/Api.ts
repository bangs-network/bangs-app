import { axiosUtils } from './axioService'

//Home
export const LoginApi = <T>(params: any) => axiosUtils.get<T>('/verse/home', params, {timeout: 15000});

export const CreateVerseApi = <T>(params: any) => axiosUtils.post<T>('/verse/create', params, {timeout: 15000});

export const HomeVerseApi = <T>(params: any) => axiosUtils.get<T>('/verse/home', params, {timeout: 15000});

export const VersePointApi = <T>(params: any) => axiosUtils.post<T>('/timeline/create', params, {timeout: 15000});

export const RoleCreateApi = <T>(params: any) => axiosUtils.post<T>('/role/create', params, {timeout: 15000});

export const TalkCreateApi = <T>(params: any) => axiosUtils.post<T>('/timeline/talk', params, {timeout: 15000});