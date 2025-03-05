import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const _callApi = (
    servicePath: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
): Promise<AxiosResponse<any>> => {
    const url = `http://localhost:8080${servicePath}`;
    console.log("Request URL:", url);

    const config: AxiosRequestConfig = {
        method,
        url,
        data: body,
    };

    return axios(config);
}

export const callApi = (
    servicePath: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
): Promise<AxiosResponse<any>> => {
    return _callApi(servicePath, method, body).catch(error => {
        throw error;
    });
}
