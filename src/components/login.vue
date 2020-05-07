<template>
  <div class="login_container">
    <div class="login_box">
      <div class="title">登录</div>
      <!--表单  ref就是表单的引用对象-->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules" @keyup.enter.native="login">
        <!--账号-->
        <el-form-item prop="count">
          <el-input v-model="loginForm.count" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button @click='login' type="primary">登录</el-button>
          <el-button @click='register'>注册</el-button>
        </el-form-item>
        <el-divider content-position="center" class="xian">第三方登录</el-divider>
        <div class="flex-c-m">
        						<!-- <a href="#" class="login100-social-item bg1">
        							<i class="fa fa-wechat"></i>
        						</a> -->

        						<a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101871457&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.xkxxkx.cn%2F%23%2Findex%2Findex" class="login100-social-item bg2">
        							<svg t="1588762426166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2406" width="200" height="200"><path d="M116.435 593.714c-33.54 78.964-38.985 154.297-12.059 168.37 18.572 9.696 47.686-12.382 74.936-52.909 10.791 44.157 37.493 84.137 75.633 116.21-40.004 14.768-66.135 38.886-66.135 66.232 0 44.954 70.709 81.302 157.978 81.302 78.716 0 143.907-29.538 155.94-68.371 3.232-0.049 15.663-0.049 18.796 0 12.083 38.784 77.324 68.371 155.989 68.371 87.267 0 157.978-36.398 157.978-81.302 0-27.297-26.105-51.464-66.135-66.232 38.089-32.123 64.889-72.053 75.631-116.21 27.251 40.527 56.29 62.605 74.887 52.909 26.95-14.073 21.631-89.456-12.032-168.37-26.355-62.058-62.11-107.754-89.457-117.848 0.398-3.929 0.596-7.958 0.596-11.935 0-23.968-6.661-46.146-18.049-64.196 0.199-1.393 0.199-2.834 0.199-4.227 0-11.038-2.636-21.381-7.114-30.332-6.909-161.309-111.93-289.402-281.866-289.402-170.036 0-275.106 128.093-281.943 289.402-4.525 9.001-7.135 19.343-7.135 30.332 0 1.393 0.099 2.835 0.15 4.227-11.288 18.05-17.951 40.178-17.951 64.196 0 3.978 0.15 7.955 0.498 11.935-27.151 10.094-63.028 55.841-89.333 117.848z" p-id="2407" fill="#ffffff"></path></svg>
        						</a>

        						<!-- <a href="#" class="login100-social-item bg3">
        							<i class="fa fa-weibo"></i>
        						</a> -->
        					</div>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import '../static/login.css'
  import '../static/util.css'
  export default {
    data() {
      return {
        loginForm: {
          count: '',
          password: ''
        },
        loginFormRules: {
          count: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在 6 到 16 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在 6 到 16 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      register() {
        this.$router.push('/register');
      },
      login() {
        this.$refs.loginFormRef.validate(async valid => { //this.$refs.loginFormRef获取表单对象,通过该表单的validate方法验证整个表单
          if (!valid) { //然后调用回调函数,有两个参数  是否校验成功和未通过校验的字段
            return;
          } else { //整个表单验证完之后,像后端发起请求
            const result = await this.$http.post('login', this.loginForm)
              .then((dat) => { //dat服务器返回的信息
                if (dat.data.code == 400) { //登陆失败
                  this.$message({
                    message: '账号或密码错误',
                    type: 'error',
                    duration: 1500,
                    showClose: true
                  })
                } else if (dat.data.code == 200) { //登陆成功,切换路由
                  this.$message({
                    message: '登陆成功',
                    type: 'success',
                    duration: 1500,
                    showClose: true
                  });
                  window.localStorage.setItem('loginFlag', true)
                  window.localStorage.setItem('id', dat.data.id)
                  window.localStorage.setItem('myrouter', '/index/index')
                  this.$router.push({
                    path: '/index/index'
                  })

                } else {
                  this.$message({
                    message: '系统错误',
                    type: 'error',
                    duration: 1500,
                    showClose: true
                  });
                }
              })
          }
        })
      },
      // QQ 第三方登录
      // qqLoginClick(qq) {
      //   // 直接弹出授权页面，授权过后跳转到回调页面进行登录处理
      //   QC.Login.showPopup({
      //     appId: "101871457",
      //     redirectURI: "http://www.xkxxkx.cn/#/index/index" //登录成功后会自动跳往该地址
      //   });
      // }
    }
  }
</script>

<style scoped>
  .login_container {
    height: 900px;
    width: 100%;
    background: url(../static/background.jpg) no-repeat 0px 0px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  .login_box {
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    height: 50px;
    font-size: 50px;
    margin: 30px 0 80px 37%;
  }

  .login_form {
    position: absolute;
    bottom: 8%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: center;

  }

  .icon{
      height: 30px;
      width: 30px;
  }

  >>>.el-input {
    border-color: #0000FE;
  }

a {
	font-family: 'Microsoft Yahei';
	font-size: 14px;
	line-height: 1.7;
	color: #666666;
	margin: 5px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
	-o-transition: all 0.4s;
	-moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}
a:hover {
	text-decoration: none;
	color: #a64bf4;
}

.bg1 {background-color: #3b5998}
.bg2 {background-color: #1da1f2}
.bg3 {background-color: #ea4335}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 2;
  }
}


/*//////////////////////////////////////////////////////////////////
[ Social item ]*/
.login100-social-item {
  font-size: 25px;
  color: #fff;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px;
}

.login100-social-item:hover {
  color: #fff;
  background-color: #333333;
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}

</style>
