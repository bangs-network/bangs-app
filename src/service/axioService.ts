import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import ShowLoading from "../components/widget/Loading";

let baseURL = 'https://api.bangs.network';


const timeout = 30000;


const axioService = axios.create({
    timeout,
    baseURL
});

axioService.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        console.info("interceptors=====")

        let customHeaders: AxiosRequestHeaders = {
            SessionID: localStorage.getItem('SessionID') ||  ""
        };
        config.headers = customHeaders;
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

interface axiosTypes<T>{
    data: T;
    status: number;
    statusText: string;
}

interface responseTypes<T>{
    code: number,
    msg: string,
    body: T
}


const requestHandler = <T>(method: 'get' | 'post' | 'put' | 'delete', url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    let response: Promise<axiosTypes<responseTypes<T>>>;
    console.info("requestHandler=====")
    //ShowLoading();

    switch(method){
        case 'get':
            response = axioService.get(url, {params: { ...params }, ...config});
            break;
        case 'post':
            response = axioService.post(url, {...params}, {...config});
            break;
        case 'put':
            response = axioService.put(url, {...params}, {...config});
            break;
        case 'delete':
            response = axioService.delete(url, {params: { ...params }, ...config});
            break;
    }

    return new Promise((resolve, reject) => {
        response.then(res => {

            const data = res.data;
            if(data.code !== 1000){

                if(data.code == 401){
                    console.log('Error...');
                }

                let e = JSON.stringify(data);
                console.log(`Error：${e}`)
                reject(data.msg);
            }else{
                console.log(`body：${data.body}`)
                resolve(data.body);
            }

        }).catch(error => {
            let e = JSON.stringify(error);
            console.log(`Network Error：${e}`)
            reject(e);
        })
    })
}

const axiosUtils = {
    get: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('get', url, params, config),
    post: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('post', url, params, config),
    put: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('put', url, params, config),
    delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) => requestHandler<T>('delete', url, params, config)
};

export { axiosUtils };