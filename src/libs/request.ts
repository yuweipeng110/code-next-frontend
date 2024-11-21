import { loginUserInfoStorage } from "@/utils/token";
import axios, { AxiosRequestConfig } from "axios";

// 创建 Axios 实例
const myAxios = axios.create({
    // baseURL: "http://localhost:8101", // 使用mock数据请注释掉这一行
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
});

// 创建请求拦截器
myAxios.interceptors.request.use(
    function (config) {
        const loginUser = JSON.parse(loginUserInfoStorage.getUserInfo());
        if (loginUser && loginUser.token) {
            config.headers.Authorization = 'Bearer ' + loginUser.token;
        }
        // 请求执行前执行
        return config;
    },
    function (error) {
        // 处理请求错误
        return Promise.reject(error);
    },
);

// 创建响应拦截器
myAxios.interceptors.response.use(
    // 2xx 响应触发
    (response) => {
        // 处理响应数据
        const { data } = response;
        // 未登录
        if (data.code === 40100) {
            // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
            if (
                !response.request.responseURL.includes("user/get/login") &&
                !window.location.pathname.includes("/user/login")
            ) {
                window.location.href = `/user/login?redirect=${window.location.href}`;
            }
        } else if (data.code !== 20000) {
            // 其他错误
            throw new Error(data.message ?? "服务器错误");
        }
        return response;
    },
    // 非 2xx 响应触发
    function (error) {
        // 处理响应错误
        return Promise.reject(error);
    },
);

// export default myAxios;
export default function request<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return myAxios<T>({
        ...params,
        url,
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
        throw error;
    });
}