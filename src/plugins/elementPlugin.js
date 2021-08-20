import Vue from 'vue'

// 按需引入element-ui 模块
import {
    Button,
    Container,
    Aside,
    Main,
    Header,
    Input,
    Popover,
    Form,
    FormItem,
    Message,
    Dialog,



} from 'element-ui'


Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Input)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)

Vue.prototype.$message = Message