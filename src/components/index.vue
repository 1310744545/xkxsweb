<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <!-- logo -->
      <div class="indexleft">
        <el-menu router active-text-color="#0000FE " class="el-menu-demo" mode="horizontal" :default-active="activeIndex"
          @select="handleSelect" style="width: 100px;display: flex;justify-content: left;">

          <a href="http://www.xkxxkx.cn" style="padding: 0;margin: 0;"><img src="../static/logo.jpg" style="width: auto;height: 51px;margin: 0px 40px 0 50px;" /></a>
          <el-menu-item index="/index/index"> 首页</el-menu-item>
          <el-menu-item index="/index/article"> 帖子</el-menu-item>
          <el-menu-item index="/index/MovieList"> 影视</el-menu-item>
          <el-menu-item index="/index/about" > 关于</el-menu-item>
          <el-menu-item index="/index/other"> 后续待开发</el-menu-item>
        </el-menu>
      </div>
      <div class="indexright">
        <!-- 已登录 -->
        <ul class="ulright">
          <li>
            <el-menu v-if="loginFlag" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="4" @click='logout()' class="el-icon-switch-button" target="_blank"> 退出</el-menu-item>
            </el-menu>
          </li>
          <li>
            <el-menu v-if="loginFlag" class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
              <el-submenu index=null>
                <template slot="title"><i class="el-icon-tickets"></i>帖子</template>
                <el-menu-item index="/index/writearticle"><i class="el-icon-edit"></i> 发帖子</el-menu-item>
                <el-menu-item index="/index/myarticle" @click="toMyArticle"><i class="el-icon-tickets"></i>我的帖子</el-menu-item>
              </el-submenu>
            </el-menu>
          </li>
          <li>
            <el-menu v-if="loginFlag" class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect"
              router>
              <el-submenu index=null>
                <template slot="title" :name.sync='name'><i class="el-icon-s-custom"></i>{{name}}</template>
                <el-menu-item index="/index/info/">个人信息</el-menu-item>
                <el-menu-item index="">后续待开发</el-menu-item>
                <el-menu-item index="">...</el-menu-item>
              </el-submenu>
            </el-menu>
          </li>
          <li v-if="loginFlag" style="width: 70px;padding: 5px 0 0 0;">
            <el-row class="demo-avatar demo-basic">
              <el-col :span="12">
                <div class="demo-basic--circle">
                  <div class="block">
                    <el-avatar :size="50" :src="headImg"></el-avatar>
                  </div>
                </div>
              </el-col>
            </el-row>
          </li>
          <li>
            <!-- 未登录 -->
            <el-row v-if="!loginFlag">
              <el-button type="primary" @click='login()'>登录</el-button>
            </el-row>
          </li>
        </ul>
      </div>
    </el-header>
    <!-- 内容区域 -->
    <el-main>
      <!-- 监听update事件 子组件通过this.$emit('updatename')来触发 -->
      <router-view @updatename="updatname($event)"></router-view>
    </el-main>
    <el-footer height="100px" style="font-size: 12px;text-align: center;">
      <span><a href="https://github.com/1310744545"><img src="https://github.com/fluidicon.png" style="height: 40px;width: 40px;"></a></span><br>
      <span>Copyright @2020 1310744545</span><br>
      <span><a href="http://beian.miit.gov.cn/" style="text-decoration: none;">黑ICP备20000673号-1</a></span>
    </el-footer>
  </el-container>
</template>

<script>
  import { Loading } from 'element-ui'
  export default {
    data() {
      return {
        loginFlag: false,
        activeIndex: '/index/index',
        id: window.localStorage.getItem('id'),
        name: '',
        headImg: '',
        defaultHeight: {
          height: ''
        }
      }
    },
    methods: {
      login() { //页面跳转
        this.$router.push('/login');
      },
      logout() { //退出
        this.$http.post('/logout');
        this.loginFlag = false;
        window.localStorage.clear();
        window.sessionStorage.clear();
        QC.Login.signOut();
        this.$router.push('/index/index');
      },
      handleSelect(key, keyPath) {
        // console.log(key);
        // console.log(keyPath);
        if (key != this.activeIndex) { //解决路由重复
          this.$router.push(key); //切换组件
          this.activeIndex = key;
        }
        window.sessionStorage.setItem("myrouter", key);
      },
      loginchick() { //登录检查
        this.loginFlag = window.localStorage.getItem('loginFlag');
      },
      searchUser() {
        if (this.loginFlag) {
          this.$http.post('/God', {
            'id': this.id
          }).then(dat => {
            this.name = dat.data.name;
            this.headImg = dat.data.headImg;
          })
        }
      },
      updatname($event) {
        this.name = $event
      },
      updaterouter() {
        if(window.sessionStorage.getItem("myrouter")==null){
          this.activeIndex='/index/index'
        }else{
          this.activeIndex = window.sessionStorage.getItem("myrouter");
        }
      },
      toMyArticle() {
        this.$router.push({
          path: `/index/myarticle/${this.id}`,
        })
      }
    },
    created() {

    },
    mounted() {
      let _this = this;
      // 检查是否登录
      if (QC.Login.check()) {
        let loadingInstance;
        loadingInstance  = Loading.service({ //加载loading
              				fullscreen: true,
              				text: 'Loading',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
         });
        window.localStorage.setItem('loginFlag', true);
        _this.loginchick();
        // 该处的openId，accessToken就是后台需要的参数了，后台可以通过这些参数获取临时登录凭证，然后就是自己的逻辑了
        QC.Login.getMe(function(openId, accessToken) {
          if (openId !== undefined) {
            //openId 是用户的唯一标识，也是需要存到数据库的
            // console.log(openId)
            // console.log('-------------------------------')
            // console.log(accessToken)
            // 用JS SDK调用OpenAPI
            QC.api('get_user_info', {
                access_token: accessToken,
                oauth_consumer_key: 101871457,
                openid: openId
              })
              // 指定接口访问成功的接收函数，s为成功返回Response对象
              .success(function(s) {
                // 成功回调，通过s.data获取OpenAPI的返回数据
                // console.log('---------------------------------------------')
                // console.log(s.data)
                //我把调用成功的返回数据打印到控制台，可以把这些参数发请求到后台，存入数据库
                _this.$http.post('/qqLogin', {
                  openId: openId,
                  name: s.data.nickname,
                  imgUrl: s.data.figureurl_qq_2
                }).then(dat => {
                  // console.log(dat.data)
                  window.localStorage.setItem('id', dat.data.id);
                  _this.id=dat.data.id;
                  _this.$http.post('/God', {
                    'id': dat.data.id
                  }).then(dat => {
                    _this.name = dat.data.name;
                    _this.headImg = dat.data.headImg;
                  })
                })
              })
              // 指定接口访问失败的接收函数，f为失败返回Response对象
              .error(function(f) {
                // 失败回调
                alert('获取用户信息失败！')
              })
            // _this.$router.push({ path: '/home' })//登录成功我处理完后跳转到首页了
          }
        })
        console.log('已登录!')
        _this.$message.success('qq成功登录')
        _this.$router.push({ path: '/' })
        loadingInstance.close();//关闭loading
      } else {
        console.log('未登录')
      }
      this.updaterouter()
      this.loginchick();
      this.searchUser();
    }
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
    margin: 0;
    background-color: rgb(255, 255, 255);
    font-size: 30px;
    display: flex;

    justify-content: space-between;
    border-color: #C8CBCF;
    ;
  }

  .indexleft,
  .indexright {
    width: 50%;
  }

  .ulright {
    margin: 0;
    padding: 0;
  }

  .ulright>li {
    list-style: none;
    float: right;
    width: 135px;
  }

  .el-main {
    background-color: rgb(245, 247, 249);
    /* height: 100%; */
    width: 100%;
    /* background: url(../static/background.jpg) no-repeat 0px 0px; */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* min-height: 100vh; */
    font-family: 'Roboto', sans-serif;
    overflow: hidden;

  }

  el-button {
    left: 0;
  }

  a {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>
