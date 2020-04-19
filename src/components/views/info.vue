<template>
  <div class="infodiv">
    <div class="head">
      <div class="touxiang">
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar shape="square" :size="100" :src="GodInfo.headImg"></el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" @click="toggleShow">修改头像</el-button>
        </el-row>
      </div>
    </div>
    <div class="info">
      <ul>
        <li class="tital">个人信息</li>
        <el-form label-width="80px" :label-position="labelPosition" :rules="rules" :model="GodInfo" ref="GodInfo">
          <li>
            <el-form-item label="昵称:" prop="name" required>
              <el-input v-model="GodInfo.name">{{GodInfo.name}}</el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="email:" prop="email">
              <el-input v-model="GodInfo.email">{{GodInfo.email}}</el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="个人主页:" prop="url">
              <el-input v-model="GodInfo.url">{{GodInfo.url}}</el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="个人简介:" prop="introduction">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="GodInfo.introduction">{{GodInfo.introduction}}</el-input>
            </el-form-item>
          </li>
        </el-form>
        <li></li>
        <li>
          <el-row>
            <el-button type="primary" class="infobutton" @click="update()">更新</el-button>
          </el-row>
        </li>
      </ul>
    </div>
    <my-upload
          v-model="show"
          field="img"
          :width="300"
          :height="300"
          :url="'http://localhost/headImg'"
          :params="params"
          img-format="jpg"
          :no-rotate="false"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
        />
  </div>

</template>

<script>
  import myUpload from 'vue-image-crop-upload';
  export default {
    data() {
      return {
        labelPosition: 'top',
        show: false,
        params:{
          headid:window.sessionStorage.getItem('id')
        },
        GodInfo: {
          id: window.sessionStorage.getItem('id'),
          name: '',
          email: '',
          url: '',
          introduction: '',
          headImg: ''
        },
        rules: {
          name: [{
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }],
          email: [{
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }],
          url: [{}],
          introduction: [{
            min: 0,
            max: 60,
            message: '长度在 0 到 60 个字符',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show;
      },
      //上传成功回调
      cropUploadSuccess() {
          this.selectGod();
          this.$router.go(0)
      },
      //上传失败回调
      cropUploadFail() {

      },
      selectGod() {
        this.$http.post('/God', {
          'id': this.GodInfo.id
        }).then(dat => {
          this.GodInfo.name = dat.data.name;
          this.GodInfo.email = dat.data.email;
          this.GodInfo.url = dat.data.url;
          this.GodInfo.introduction = dat.data.introduction;
          this.GodInfo.headImg = dat.data.headImg;
        })
      },
      update() {
        this.$refs.GodInfo.validate(valid => {
          if (!valid) {
            return
          } else {
            this.$http.post('/GodUpdate', this.GodInfo).then(dat => {
              if (dat.data == '更新成功') {
                this.$message({
                  message: '更新成功',
                  type: 'success',
                  duration: 1500,
                  showClose: true
                })
                this.$emit('updatename', this.GodInfo.name) //通过此方法来调用父组件的方法 ------方法名,携带的参数,多个用数组
              } else {
                this.$message({
                  message: '更新失败,系统错误',
                  type: 'error',
                  duration: 1500,
                  showClose: true
                })
              }
            })
          }
        })
      }
    },
    created() {
      this.selectGod();
    },
    components: {
          "my-upload": myUpload
        },
  }
</script>

<style scoped="scoped">
  .infodiv {
    height: 700px;
    width: 40%;
    margin: 0 auto;
    background-color: white;

  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    height: 50%;
  }

  .tital {
    font-size: 35px;
    text-align: center;
  }

  .head {
    height: 600px;
    width: 30%;
    float: left;
  }

  .touxiang {
    height: 100px;
    width: 100px;
    margin: 60% auto 0 auto;
  }

  .info {
    height: 600px;
    width: 65%;
    float: left;
    margin: 5% 0;
  }

  .infobutton {
    width: 100%;
  }
</style>
