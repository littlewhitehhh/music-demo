import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式表
import './assets/css/base.css'

// 按需导入element-ui
import './plugins/elementPlugin'


Vue.config.productionTip = false




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')