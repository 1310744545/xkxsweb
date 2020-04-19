import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import $ from 'jquery'

import axios from 'axios'
axios.defaults.baseURL='http://localhost/'   //请求的根路径
axios.interceptors.request.use(config=>{
  // console.log(config)
  config.headers.Authorizaion=window.sessionStorage.getItem('loginflag')  //给请求头中添加一个Authorizaion
  return config
})
Vue.prototype.$http=axios


//导入全局样式表
import './assets/css/global.css'


Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
