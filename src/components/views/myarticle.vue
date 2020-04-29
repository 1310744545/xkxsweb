<template>
  <div class="myarticle">
    <div class="godinfo">
      <ul class="godinfoul">
        <li style="margin: 10px auto 10px auto;">
          <img style="width: 150px;height: 150px;border-radius: 50%;" :src="God.headImg"/>
        </li>
        <li><span style="line-height:36px;"><i class="el-icon-user-solid" style="color: #0000FE;"></i> {{God.name}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-position" style="color: #0000FE;"></i> {{God.email}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-location-information" style="color: #0000FE;"></i> {{God.url}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-edit-outline" style="color: #0000FE;"></i> {{God.introduction}}</span></li>
      </ul>
    </div>
    <div class="article">
      <ul class="upli" v-if="!articleFlag">
        <li style="font-size: 30px;line-height: 140px;margin: 0 0 0 30%;">该用户很懒啥也没写...</li>
      </ul>
      <ul v-for="item in reverseArticle" :key="item.aid" v-if="articleFlag">
        <li class="upli">
          <div class="title">
            <router-link :to="{name:'articleDetail',query:{aid:item.aid}}" class="atitle">{{item.title}}</router-link>
            <div class="contentsmall" v-html="replaceImg(item.content)"></div>
          </div>
          <div class="message">
            <ul class="downul">
              <li style="width: auto;height: 36px;border-right:1px solid #DDDDDD">
                <span style="float: left;">
                  <router-link :to="{name:'PeopleArticle',query:{uid:God.id}}" style="text-decoration: none;color:#333;font-size: 16px;line-height: 36px;">
                  <el-row class="demo-avatar demo-basic" style="float: left;">
                    <el-col :span="12">
                      <el-avatar shape="square" :size="size" :src="God.headImg"></el-avatar>
                    </el-col>
                  </el-row>
                  {{God.name}}
                  </router-link>
                </span>
              </li>
              <li style="width: 140px;height: 36px;border-right:1px solid #DDDDDD">
                <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">{{item.time}}</span>
              </li>
              <li style="width: 80px;height: 36px;border-right:1px solid #DDDDDD">
                <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">评论数: <b style="color: #007BFF">{{item.comment}}</b></span>
              </li>
              <li style="width: 80px;height: 36px;border-right:1px solid #DDDDDD">
                <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">点赞数: <b style="color: #007BFF">{{item.praise}}</b></span>
              </li>
               <li style="width: 80px;height: 36px;">
                <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">阅读数: <b style="color: #007BFF">{{item.read}}</b></span>
              </li>
              <li style="width: 80px;height: 36px;float: right;margin: 0 0 0 13px;">
                <el-button type="text" @click="deleteArticleAid(item.aid)">删除</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose">
                  <span>确认要删除吗?</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteArticle">确 定</el-button>
                  </span>
                </el-dialog>
              </li>
              <li style="width: 40px;height: 36px;float: right;border-right:1px solid #DDDDDD">
                <el-button type="text" @click="updateArticle(item.aid)">修改</el-button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="myArticle.length">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uid: this.$route.params.id,
        myArticle: [],
        newmyArticle: [],
        size: "small",
        squareUrl: '',
        articleFlag:true,
        currentPage:1,
        pagesize:5,
        God: {},
        dialogVisible: false,
        deleteAid:-1
      }
    },
    methods: {
      selectArticle() {
        this.$http.post('/selectArticle', {
          uid: this.uid
        }).then(dat => {
          if(dat.data.length!=0){
            this.myArticle = dat.data;
            this.newmyArticle=this.myArticle.slice(-this.pagesize);
          }else{
            this.articleFlag=false;
          }
        })
      },
      replaceImg(msg) {
        var img = /<\/?.+?\/?>/g;
        var newmsg = msg.replace(img, '');
        if (newmsg.length > 40)
          return newmsg.slice(0, 40) + '...'
        return newmsg
      },
      selectGod() {
        this.$http.post('/God', {
          'id': this.uid
        }).then(dat => {
          this.God = dat.data;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        if(val==1){
          this.newmyArticle=this.myArticle.slice(-(val)*this.pagesize);
        }else{
          this.newmyArticle=this.myArticle.slice(-(val)*this.pagesize,-(val-1)*this.pagesize);
        }
         $(window).scrollTop(0);
      },
      handleClose(){

      },
      deleteArticleAid(aid){
        this.dialogVisible = true;
        this.deleteAid=aid;
      },
      deleteArticle(){
        this.dialogVisible = false;
        this.$http.post('/deleteArticle',{aid:this.deleteAid}).then(dat=>{
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500,
            showClose: true
          })
          this.selectArticle();
        })
      },
      updateArticle(aid){
        this.$router.push({name: 'UpdateArticle', query: {aid: aid }})
        $(window).scrollTop(0);
      }
    },
    mounted() {
      this.selectArticle();
      this.selectGod();
    },
    computed: {
      reverseArticle() {
        return this.newmyArticle.reverse(); //监听myArticle并反转
      }
    }
  }
</script>

<style scoped="scoped">
  * {
    margin: 0;
    padding: 0;
  }
  .godinfoul{
    display: table;
    margin-left: auto;
    margin-right: auto;
  }
  .godinfoul li{
      height: auto;
      padding:  auto;
      width: 80%;
  }
  .myarticle {
    height: auto;
    min-height: 650px;
    width: 80%;
    margin: 0 auto;
  }

  .godinfo {
    height: auto;
    width: 300px;
    background-color: white;
    float: left;
  }

  .article {
    float: left;
    width: 70%;
    margin: 0 0 0 2%;
  }

  ul {
    list-style: none;
  }

  .upli {
    height: 160px;
    background-color: white;
    margin: 0 0 10px 0;
    border-radius: 10px;
    padding: 20px 0 0 0;
  }

  .upli:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  a {
    text-decoration: none;
    font-size: 30px;
    font-family: 'Times New Roman', Times, serif;
    color: #0062CC;
  }

  .title {
    padding: 10px 0 0 4%;
    height: 70px;
  }

  .contentsmall {
    margin: 10px 0 0 0;
  }

  el-divider {
    height: 20px;
  }

  .message {
    margin: 2% 0 0 4%;
  }

  .downul li {
    float: left;
  }
  .block{
    margin: 0 0 0 30%;
  }
</style>
