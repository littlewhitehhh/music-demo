import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载模式引入组件
//引入index
const Index = () =>
    import ('views/index.vue')

// 引入discover相关页面

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/index',
        component: Index,
        // redirect: '/discover',
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router