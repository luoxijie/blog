import Vue from 'vue'

import { 
    Button,
    Message,
    Row,
    Col,
    Input,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Menu,
    MenuItem,
    Submenu,
    Form,
    FormItem,
    Dialog,
    Tag,
    // InputNumber,
    Table,
    TableColumn,
    // Tag,
    // Carousel,
    // CarouselItem,
    Pagination,
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Tag)
// Vue.use(CarouselItem)
Vue.use(Pagination)

Vue.prototype.$message = Message