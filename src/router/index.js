import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载模式引入组件
//引入index
const Index = () =>
    import ('views/index.vue')

// 引入discover
const Discover = () =>
    import ('views/Discover/discover.vue')
    // 引入 discover子组件
const Recommend = () =>
    import ('views/Discover/DiscoverChildren/recommend.vue')
const MusicList = () =>
    import ('views/Discover/DiscoverChildren/musicList.vue')
const Ranking = () =>
    import ('views/Discover/DiscoverChildren/ranking.vue')
const singer = () =>
    import ('views/Discover/DiscoverChildren/singer.vue')

// 引入collection
const Collection = () =>
    import ('views/Collection/collection.vue')
    // 引入collection子组件
const collectionAlbum = () =>
    import ('views/Collection/CollectionChildren/collectionAlbum.vue')
const collectionSinger = () =>
    import ('views/Collection/CollectionChildren/collectionSinger.vue')
const collectionVideo = () =>
    import ('views/Collection/CollectionChildren/collectionVideo.vue')

// 引入video
const Videos = () =>
    import ('views/Video/videos.vue')
    // 引入viedo子组件
const videoList = () =>
    import ('views/Video/VideoChildren/videolist.vue')
const mvList = () =>
    import ('views/Video/VideoChildren/mvList.vue')



// 引入RecommendMusic
const RecommendMusic = () =>
    import ('views/RecommendMusic/recommendMusic.vue')


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/index',
        component: Index,
        redirect: '/discover',
        children: [{ // 、discover
                path: '/discover',
                component: Discover,
                redirect: '/discover/recommend',
                children: [{
                        path: '/discover/recommend',
                        component: Recommend,
                    },
                    {
                        path: '/discover/musiclist',
                        component: MusicList,
                    }, {
                        path: '/discover/ranking',
                        component: Ranking,
                    }, {
                        path: '/discover/singer',
                        component: singer,
                    }
                ]
            },
            { // 、collection
                path: '/collection',
                component: Collection,
                children: [{
                        path: '/collection/collectionAlbum',
                        component: collectionAlbum
                    },
                    {
                        path: 'collection/collectionSinger',
                        component: collectionSinger
                    },
                    {
                        path: '/collection/collectionVideo',
                        component: collectionVideo
                    }
                ]

            },
            { // 、video
                path: '/video',
                component: Videos,
                children: [{
                        path: '/video/videolist',
                        component: videoList,
                    },
                    {
                        path: '/video/mvlist',
                        component: mvList
                    }
                ]
            },
            { // 、recommendMusic
                path: '/recommendMusic',
                component: RecommendMusic
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router