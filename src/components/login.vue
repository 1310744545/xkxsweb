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
      </el-form>
    </div>
  </div>
</template>

<script>
  // import '../static/login.css'
  // import '../static/util.css'
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
              .then((dat) => {					    //dat服务器返回的信息
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
                  window.sessionStorage.setItem('loginFlag',true)
                  window.sessionStorage.setItem('id',dat.data.id)
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
    height: 400px;
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
    bottom: 15%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: center;
  }

  >>>.el-input {
    border-color: #0000FE;
  }
</style>
