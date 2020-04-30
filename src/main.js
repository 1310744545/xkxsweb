import './plugins/element.js'
import $ from 'jquery'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'


import axios from 'axios'
axios.defaults.baseURL = 'http://www.xkxxkx.cn' //请求的根路径
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorizaion = window.localStorage.getItem('loginflag') //给请求头中添加一个Authorizaion
  return config
})
Vue.prototype.$http = axios

router.beforeEach((to, from, next) => {
  if (to.path === '/index/writearticle' || to.path === '/index/myarticle' || to.path === '/index/articledetail' ||
    to.path === '/index/info'){
      if(window.localStorage.getItem('loginFlag')){
        return next();
      }else{
        return next('/login');
      }
    }else{
      next();
    }
    next();
});


//导入全局样式表
import './assets/css/global.css'


Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
