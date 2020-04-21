<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <!-- logo -->
      <div class="indexleft">
        <el-menu router active-text-color="#0000FE " class="el-menu-demo" mode="horizontal" :default-active="activeIndex"
          @select="handleSelect" style="width: 100px;display: flex;justify-content: left;">

          <a href="localhost"><img src="../static/logo.jpg" style="width: 40px;height: 40px;margin: 12px 40px 0 50px;" /></a>
          <el-menu-item index="/index/index"> 首页</el-menu-item>
          <el-menu-item index="/index/article"> 帖子</el-menu-item>
          <el-menu-item index="/index/movies"> 影视</el-menu-item>
          <el-menu-item index="/index/about"> 关于</el-menu-item>
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
                <el-menu-item index="/index/myarticle"><i class="el-icon-tickets"></i>我的帖子</el-menu-item>
              </el-submenu>
            </el-menu>
          </li>
          <li>
            <el-menu v-if="loginFlag" class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect"
              router>
              <el-submenu index=null>
                <template slot="title" :name.sync='name'><i class="el-icon-s-custom"></i>{{name}}</template>
                <el-menu-item index="/index/info">个人信息</el-menu-item>
                <el-menu-item index="">选项2</el-menu-item>
                <el-menu-item index="">选项3</el-menu-item>
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
    <el-footer height="100px"></el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        loginFlag: false,
        activeIndex: '/index/index',
        name: '',
        headImg: '',
        defaultHeight:{
          height:''
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
        window.sessionStorage.clear();
        this.$router.push('/index/index');
      },
      handleSelect(key, keyPath) {
        // console.log(key);
        // console.log(keyPath);
        if (key != this.activeIndex) { //解决路由重复
          this.$router.push(key); //切换组件
        }
        this.activeIndex = key;
        window.sessionStorage.setItem("myrouter", key);
      },
      loginchick() { //登录检查
        this.loginFlag = window.sessionStorage.getItem('loginFlag');
      },
      searchUser() {
        if (this.loginFlag) {
          this.$http.post('/God', {
            'id': window.sessionStorage.getItem('id')
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
        this.activeIndex = window.sessionStorage.getItem("myrouter");
      }
  },
  created() {
    this.loginchick();
    this.searchUser();
  },
  mounted() {
    this.updaterouter();
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

</style>
