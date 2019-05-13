import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'

Vue.use(ElementUI)
Vue.use(VCharts)

Vue.config.productionTip = false;
Vue.prototype.axios = axios; 
axios.defaults.baseURL='http://localhost:8090/graduationProject/haitunAdmin/public/admin/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           
//全局注册，使用方法为:this.qs

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
