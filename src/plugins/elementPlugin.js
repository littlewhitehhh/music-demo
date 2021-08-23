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
    Menu,
    MenuItemGroup,
    MenuItem,
    Carousel,
    CarouselItem,
    Pagination


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
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)

Vue.prototype.$message = Message