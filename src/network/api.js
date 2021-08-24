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
// 上传验证码并检查
export function submitCode(phone, code) {
    return request({
        methods: 'Get',
        url: '/captcha/verify',
        params: {
            phone,
            captcha: code
        }
    })
}

// 完成注册
export function finishRegister({ phone, password, nickname, code }) {
    return request({
        methods: 'Get',
        url: '/register/cellphone',
        params: {
            phone,
            password,
            nickname,
            captcha: code
        }
    })
}

// 获取热搜榜
export function getHotSearch() {
    return request({
        methods: 'Get',
        url: '/search/hot/detail'
    })
}

// 根据输入内容进行搜索  搜索建议
export function getSearchSuggest(keywords) {
    return request({
        methods: 'Get',
        url: '/search/suggest',
        params: {
            keywords,
        },
    })
}



// 获取个性推荐歌单 recommendMusicList
export function getRecommendMusic(limit = 10) {
    return request({
        method: 'GET',
        url: '/personalized',
        params: {
            limit,
        }
    })
}

// 获取个性推荐 轮播图
export function getBannerData() {
    return request({
        method: 'GET',
        url: '/banner',

    })
}

//获取歌单   高质量歌单
export function getTheFirstOfHighquality(limit = 1) {
    return request({
        method: 'GET',
        url: '/top/playlist/highquality',
        params: {
            limit,
        }

    })
}
// 获取歌单  热门歌单getHotTag 
export function getHotTag() {
    return request({
        method: 'GET',
        url: '/playlist/hot',
    })
}

// 获取歌单  歌单分类数据
export function getMusicList() {
    return request({
        method: 'GET',
        url: '/playlist/catlist',
    })
}

//获取歌单   根据歌单名获取详情信息
export function getMusicListDetail(cat, offset, limit = 20) {
    return request({
        method: 'GET',
        url: '/top/playlist',
        params: {
            cat,
            offset,
            limit
        }
    })
}
// 获取所有排行榜单

export function getAllRankings() {
    return request({
        method: 'GET',
        url: '/toplist',

    })
}


// 获取歌手列表
export function getSingerList(type, area, initial, offset) {
    return request({
        method: 'GET',
        url: '/artist/list',
        params: {
            type,
            area,
            initial,
            offset
        }

    })
}