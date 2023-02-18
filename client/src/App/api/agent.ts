
import { RequestPageSharp } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = ()=> new Promise(resolve => setTimeout(resolve, 500));
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response =>{
    await sleep();
    return response
}, (error: AxiosError ) => {
    const {data, status} = error.response as any;
    switch(status){
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break
        case 401:
            toast.error(data.title)
            break
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
            // history.push('/server-error')
        default:
            break
    }
    return Promise.reject(error.response)
});

const http = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body ).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body ).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: ()=> http.get('products'),
    details: (id: number)=> http.get(`products/${id}`),
}

const TestErrors = {
    get400Error: ()=> http.get('buggy/bad-request'),
    get401Error: ()=> http.get('buggy/unauthorized'),
    get404Error: ()=> http.get('buggy/not-found'),
    get500Error: ()=> http.get('buggy/server-error'),
    getValidationError: ()=> http.get('buggy/validation-error'),
}

const Basket = {
    get: () => http.get('basket'),
    addItem: (productId: number, quantity = 1) => http.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => http.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,Basket,
    TestErrors
}

export default agent;