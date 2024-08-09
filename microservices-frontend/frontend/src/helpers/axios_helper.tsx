import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getUser } from './auth_helper';

const _callApi = (
    token: string,
    servicePath: string,
    method: 'GET' | 'POST' = 'GET',
    customHeaders?: Record<string, any>,
    body?: any
): Promise<AxiosResponse<any>> => {
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...Object.fromEntries(Object.entries(customHeaders || {}).map(([key, value]) => [key, String(value)]))
    };

    const url = `http://localhost:8080${servicePath}`;
    console.log("Request URL:", url);

    const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        data: body,
    };

    return axios(config);
}

export const callApi = (
    servicePath: string,
    method: 'GET' | 'POST' = 'GET',
    customHeaders?: Record<string, any>,
    body?: any
): Promise<AxiosResponse<any>> => {
    console.log(customHeaders);
    return getUser().then(user => {
        if (user && user.access_token) {
            return _callApi(user.access_token, servicePath, method, customHeaders, body).catch(error => {
                throw error;
            });
        } else {
            throw new Error('User is not logged in');
        }
    });
}