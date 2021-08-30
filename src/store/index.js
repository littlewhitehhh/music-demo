import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 。。。。。。。。。。。。。。。。。
        // 是否登录
        isLogin: false,
        // 用户喜欢的音乐列表
        likeMuiscList: [],
        //已收藏的专辑
        subAlbumList: null,
        // 已收藏的歌手
        subSingerList: null,
        // 已收藏的video
        subVideoList: null,
        // 已收藏的歌单
        collectedMusicList: [],
        // 用户创建的歌单
        createdMusicList: [],

    },
    mutations: {
        // 更新登陆状态
        updataLoginState(state) {
            console.log(state);
            state.isLogin = !state.isLogin
        },
        // 跟更新已经收藏的歌单
        updateCollectMusicList(state, data) {
            state.collectedMusicList = data
        },
        // 更新用户创建的歌单
        updateCreatedMusicList(state, data) {
            state.createdMusicList = data
        }
    },
    actions: {},
    modules: {}
})