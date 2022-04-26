import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios';
import './assets/css/global.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 配置请求根路径
axios.defaults.baseURL = "http://121.37.111.7:3000";
Vue.prototype.$http = axios;

new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  components: {
    App,
  }
}).$mount('#app');

Vue.filter('formateTime',(time)=>{
  if(time == undefined){
    return ;
  }
  const data = time.split('T');
  return data[0];
});
