// 引入requset
import { request } from "./request";

// 开始api请求行为

// 手机号登陆
export function loginByPhone({ phone, password }) {
    return request({
        methods: 'Get',
        url: '/login/cellphone',
        params: {
            phone,
            password,
            withCredentials: true,
        }
    })
}

// 创建账号
// 检查手机号是否存在
export function checkPhone(phone) {
    return request({
        methods: 'Get',
        url: '/cellphone/existence/check',
        params: {
            phone,

        }
    })
}
// 获取验证码
export function getCode(phone) {
    return request({
        methods: 'Get',
        url: '/captcha/sent',
        params: {
            phone,

        }
    })
}