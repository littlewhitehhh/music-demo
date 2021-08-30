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
// 根据账号获取用户收藏、创建的歌单
export function getMusicSheetList(uid) {
    return request({
        method: 'Get',
        url: '/user/playlist',
        params: {
            uid,
        }
    })
}

//discover
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

// video
// 获取视频全部分类
export function getVideoTag() {
    return request({
        method: 'GET',
        url: '/video/category/list',

    })
}

//获取视频热门分类tag
export function getVideoCategory() {
    return request({
        method: 'GET',
        url: '/video/group/list',

    })
}

// 根据选中的标签 获取视频列表
export function getVideoList(id, offset) {
    return request({
        method: 'GET',
        url: '/video/group',
        params: {
            id,
            offset
        }

    })
}

// 获取mv
export function getMvList(type, area, order, offset) {
    return request({
        method: 'GET',
        url: '/mv/all',
        params: {
            type,
            area,
            order,
            offset
        }

    })
}


// 根据账号获取收藏的专辑
export function getCollectionAlbum(limit = 1000) {
    return request({
        method: 'GET',
        url: '/album/sublist',
        params: {
            limit
        }

    })
}
// /artist/sublist
// 根据账号获取收藏的歌手
export function getCollectionSinger(limit = 1000) {
    return request({
        method: 'GET',
        url: '/artist/sublist',
        params: {
            limit
        }

    })
}

// 根据账号请求收藏的video

export function getCollectionVideo(limit = 50) {
    return request({
        method: 'GET',
        url: '/mv/sublist',
        params: {
            limit
        }

    })
}

// 过去每日推荐歌单
export function getMusicRecommend() {
    return request({
        method: 'GET',
        url: '/recommend/songs',


    })
}



// 通过歌单id查询歌单详情
export function getSongSheetDetail(id) {
    return request({
        method: 'GET',
        url: '/playlist/detail',
        params: {
            id,
        }


    })
}

// 获取歌单评论
export function getMusicListComment(id, offset, limit = 50, ) {
    return request({
        method: 'GET',
        url: '/comment/playlist',
        params: {
            id,
            offset,
            limit,

        }
    })
}