import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import ContainIndex from './components/views/index.vue'
import Info from './components/views/info.vue'
import Movies from './components/views/movies.vue'
import Article from './components/views/article.vue'
import About from './components/views/about.vue'
import Other from './components/views/other.vue'
import Writearticle from './components/views/writearticle.vue'
import Myarticle from './components/views/myarticle.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: 'index/index'
    },
    {
      path:'/register',
      component:Register
    },
    {
      path: '/index/index',
      component: Index,
      children: [{
        path: '/index/index',
        component: ContainIndex
      }, {
        path: '/index/info',
        component: Info
      }, {
        path: '/index/movies',
        component: Movies
      }, {
        path: '/index/article',
        component: Article
      }, {
        path: '/index/about',
        component: About
      }, {
        path: '/index/other',
        component: Other
      },
      {
        path: '/index/writearticle',
        component: Writearticle
      },
      {
        path: '/index/myarticle',
        component: Myarticle
      }]
    }, {
      path: '/login',
      component: Login
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径  from 代表从哪个路径跳转而来 next 是一个函数,表示放行
  //next() 放行   next('/login') 跳转到login

  // if(to.path==='/login') return next()

  //获取存在sessionStorage中的token,并验证有没有,有就放行,没有就跳到login页面

  // const tokenStr=window.sessionStorage.getItem('token')
  // if(!tokenStr) return next('login')
  next()
})

export default router
