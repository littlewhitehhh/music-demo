import axios from "axios";


export function request(config) {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 3000,
        withCredentials: true
    })

    //  请求拦截器
    instance.interceptors.request.use(config => {
        // .....操作

        return config
    }, err => {
        console.log(err);
    })


    // 响应拦截器
    instance.interceptors.response.use(config => {
        //.......操作

        return config
    }, err => {
        console.log(err);
    })

    // 跨域访问需要发送cookie是使用
    //`withCredentials` indicates whether or not cross-site Access-Control requests
    // `表示是否跨站点访问控制请求
    instance.defaults.withCredentials = true;


    // 返回实力对象
    return instance(config)
}