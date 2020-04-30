<template>
  <div class="writeArticle">
    <el-form label-width="80px" :rules="rules" ref="ruleForm" :model="ruleForm">
      <el-form-item label="标题:" class="ArticalTitle" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <quilleditor v-model="ruleForm.content" ref="myTextEditor" :options="editorOption" @change="onChange">
        <div id="toolbar" slot="toolbar">
          <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <span class="ql-formats"><button class="ql-script" value="sub"></button></span>
          <span class="ql-formats"><button class="ql-script" value="super"></button></span>
          <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
          <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
          <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
          <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
          <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
          <span class="ql-formats"><button type="button" class="ql-link"></button></span>
          <span class="ql-formats">
            <button type="button" @click="imgClick" style="outline:none">
              <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
              </svg>
            </button>
          </span>
          <span class="ql-formats"><button type="button" class="ql-video"></button></span>
        </div>
      </quilleditor>
    </el-form>
    <div class="ArticleButton">
      <el-button @click="update" type="primary">修改</el-button>
    </div>

  </div>
</template>
<script>
  import {
    quillEditor
  } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  export default {
    name: "v-editor",
    props: {
      value: {
        type: String
      },
      /*上传图片的地址*/
      uploadUrl: {
        type: String,
        default: '/updateArticleImg'
      },
      /*上传图片的file控件name*/
      fileName: {
        type: String,
        default: 'file'
      },
      maxUploadSize: {
        type: Number,
        default: 1024 * 1024 * 500
      }
    },
    data() {
      return {
        ruleForm: {
          aid:'',
          time:'youle',
          title: '',
          content: '',
          uid:window.sessionStorage.getItem('id'),
        },
        editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        },
        rules: {
          title: {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        }
      }
    },
    methods: {
      onChange() {
        this.$emit('input', this.ruleForm.content)
      },
      /*选择上传图片切换*/
      onFileChange(e) {
        var fileInput = e.target;
        if (fileInput.files.length === 0) {
          return
        }
        this.editor.focus();
        if (fileInput.files[0].size > this.maxUploadSize) {
          this.$alert('图片不能大于500KB', '图片尺寸过大', {
            confirmButtonText: '确定',
            type: 'warning',
          })
        }
        var data = new FormData;
        data.append(this.fileName, fileInput.files[0]);
        this.$http.post(this.uploadUrl, data)
          .then(res => {
            if (res.data) {
              console.log(res.data);
              this.editor.insertEmbed(this.editor.getSelection().index, 'image', res.data)
            }
          })
      },
      /*点击上传图片按钮*/
      imgClick() {
        if (!this.uploadUrl) {
          console.log('no editor uploadUrl');
          return;
        }
        /*内存创建input file*/
        var input = document.createElement('input');
        input.type = 'file';
        input.name = this.fileName;
        input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
        input.onchange = this.onFileChange;
        input.click()
      },
      update() {
        this.$refs.ruleForm.validate(valid => {
          if (!valid) {
            return
          }
          this.$http.post('updateArticle',this.ruleForm).then(dat=>{
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1500,
              showClose: true
            });
          })
        })
      },
      selectArticleByAid(){
        this.$http.post('/selectArticleByAid',{aid:this.$route.query.aid}).then(dat=>{
          console.log(dat.data);
          this.ruleForm.title=dat.data.title;
          this.ruleForm.content=dat.data.content;
          this.ruleForm.aid=this.$route.query.aid;
        })
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    components: {
      'quilleditor': quillEditor
    },
    mounted() {
      this.content = this.value
      this.selectArticleByAid();
    },
    watch: {
      'value'(newVal, oldVal) {
        if (this.editor) {
          if (newVal !== this.content) {
            this.content = newVal
          }
        }
      },
    }
  }
</script>


<style>
  *{
    margin: 0;
    padding: 0;
  }
  .writeArticle {
    height: 100%;
    width: 78%;
    margin: 0 auto;
    background-color: white;
  }

  .ArticalTitle {
    height: 80px;
    width: 70%;
    margin: 0 auto;
    padding: 4% 0 0 0;
  }

  .edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .ql-editor {
    height: 400px;
  }
  .ArticleButton{
    width: 200px;
    margin: 20px auto;
    padding: 0 0 20px 0;
  }
</style>
