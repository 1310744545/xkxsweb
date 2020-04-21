<template>
  <div class="register_container">
    <div class="register_box">
      <div class="title">注册</div>
      <!--表单  ref就是表单的引用对象-->
      <el-form status-icon ref="registerForm" class="register_form" :model="registerForm" :rules="registerFormRules"
        @keyup.enter.native="register">
        <!--昵称-->
        <el-form-item prop="name">
          <el-input v-model="registerForm.name" prefix-icon="el-icon-user" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!--账号-->
        <el-form-item prop="count">
          <el-input v-model="registerForm.count" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input autocomplete="off" v-model="registerForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"
            type="password"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop="checkpassword">
          <el-input autocomplete="off" v-model="registerForm.checkpassword" prefix-icon="el-icon-lock" placeholder="请再次输入密码"
            type="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button @click='register' type="primary">注册</el-button>
          <el-button @click='goback'>返回</el-button>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkpassword != '') {
            this.$refs.registerForm.validateField('checkpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          name: '',
          count: '',
          password: '',
          checkpassword: ''
        },
        registerFormRules: {
          name: [{
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 5,
              message: '长度在 2 到 5 个字符',
              trigger: 'blur'
            }
          ],
          count: [{
              required: true,
              message: '请输入用户名',
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
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ],
          checkpassword: [{
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            },
            {
              validator: validatePass2,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      goback() {
        this.$router.push('/login')
      },
      register() {
        this.$refs.registerForm.validate(async valid => {
          if (!valid) {
            return
          } else {
            this.$http.post('addGod', this.registerForm).then(dat => {
               if(dat.data!="注册成功"){
                 this.$message({
                    message: '账号已存在,注册失败',
                    type: 'error',
                    duration: 1500,
                    showClose: true
                  })
               }else{
                 this.$message({
                    message: '注册成功',
                    type: 'success',
                    duration: 1500,
                    showClose: true
                  })
                  this.$router.push('/login')
               }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register_container {
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

  .register_box {
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

  .register_form {
    position: absolute;
    bottom: 10%;
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
