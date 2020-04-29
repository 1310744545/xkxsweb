<template>
  <div class="articleDetail">
    <div class="title">
      <div style="font-size: 40px;margin: 0px 0 10px 10%;">
        {{article.title}}
      </div>
      <el-row class="demo-avatar demo-basic">
        <div class="demo-basic--circle" style="margin: 0 0 0 40px;width: 100%;">
          <el-avatar :src="god.headImg"></el-avatar>
          <span>发布时间: <b>{{article.time}}</b></span>
          <span>评论数: <b>{{article.comment}}</b></span>
          <span>点赞数: <b>{{article.praise}}</b></span>
          <span style="width: 100px;">阅读数: <b>{{article.read}}</b></span>
          <a href="javascript:;" @click="praise"><span class="el-icon-thumb">赞</span></a>
        </div>
      </el-row>
      <el-divider content-position="left">{{god.name}}</el-divider>
    </div>
    <div class="content" v-html="article.content">

    </div>
    <el-divider></el-divider>
    <div>
      <div class="writecomment">
        <el-input v-model="comment.comment" placeholder="请输入评论" type="textarea" maxlength="80" show-word-limit></el-input>
        <el-button type="primary" style="margin: 1% 0 2% 0;width: 100%;" @click='addComment'>发表评论</el-button>
      </div>
    </div>
    <div class="comment">
      <ul v-for="(item,index) in newcommentsget" :key="item.index">
        <li>
          <span style="display:block;float:left;margin: 0 -15px 0 0 ; ">
            <el-avatar size="small" :src="item.god.headImg" ></el-avatar>
          </span>
          <router-link :to="{name:'PeopleArticle',query:{uid:item.god.id}}"><span style="font-size: 14px;">{{item.god.name}}</span></router-link>
          <span style="font-size: 12px;">#{{index+1}}楼</span>
          <span style="font-size: 12px;">{{timeago(item.time)}}</span>
          <span style="font-size: 15px" v-if="item.replys!=0"><a href="javascript:;" @click="checkreply(item.cid,index)">查看回复({{item.replys}})</a></span>
          <span style="font-size: 15px" @click="clickreply(index,item)"><a href="javascript:;">回复</a></span>
          <div style="padding: 20px 0 0 10px;font-size: 14px;">{{item.comment}}</div>
         <div v-if="index==activeReply" class="replyDiv"style="background-color: #F7F7F7;border-left: 3px solid #9E9E9E;">
              <ul v-for="(item,index) in checkreplys">
                <li style="height: auto;">
                  <span style="display:block;float:left;margin: 0 -15px 0 0 ; ">
                    <el-avatar size="small" :src="item.fromImg" ></el-avatar>
                  </span>
                <router-link style="line-height: 35px;font-size: 18px;" :to="{name:'PeopleArticle',query:{uid:item.fromId}}">{{item.fromName}}</router-link>回复
                <router-link style="font-size: 14px;":to="{name:'PeopleArticle',query:{uid:item.toId}}">{{item.toName}}</router-link>
                :<span style="font-size: 10px;">{{timeago(item.time)}}</span>
                <span style="font-size: 15px" @click="clickreply2(index,item)"><a href="javascript:;">回复</a></span>
                <div v-if="index==activeIndex2" class="replyDiv">
                  <el-input
                    type="textarea"
                    :rows="2"
                    :placeholder="replyName"
                    maxlength="60" show-word-limit
                    class="reply"
                    v-model="reply.content">
                  </el-input>
                  <el-button type="primary" class="replyBtn" @click="addreply(activeReply)">回复</el-button>
                </div>
                <div style="margin: 0 0 0 10%;font-size: 20px;">{{item.content}}</div>
                </li>
              </ul>
         </div>
          <div v-if="index==activeIndex" class="replyDiv">
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="replyName"
              maxlength="60" show-word-limit
              class="reply"
              v-model="reply.content">
            </el-input>
            <el-button type="primary" class="replyBtn" @click="addreply(index)">回复</el-button>
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
            :total="commentsget.length">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        article: {},
        god: {},
        size:'small',
        result:'',
        currentPage:1,
        pagesize:5,
        activeIndex:-1,
        activeIndex2:-1,
        replyName:'',
        comment: {
          cid:'',
          comment:'',
          aid:this.$route.query.aid,
          god:{
            id:'',
            count:'',
            Password:'',
            name:'',
            email:'',
            url:'',
            introduction:'',
            headImg:''
          },
          time:''
        },
        commentsget:[],
        newcommentsget:[],
        reply:{
          content:'',
          cid:'',
          fromId:window.sessionStorage.getItem('id'),
          toId:''
        },
        checkreplys:[],
        activeReply:-1
      }
    },
    methods: {
      handleSizeChange(){

      },
      handleCurrentChange(val){
        if(val==1){
          this.newcommentsget=this.commentsget.slice(-(val)*this.pagesize).reverse();
        }else{
          this.newcommentsget=this.commentsget.slice(-(val)*this.pagesize,-(val-1)*this.pagesize).reverse();
        }
      },
      selectArticleDetail() {
        this.$http.post('/selectArticleDetail', {
          aid: this.$route.query.aid
        }).then(dat => {
          this.article = dat.data;
          this.$http.post('/God', {
            id: dat.data.uid
          }).then(dat => {
            this.god = dat.data;
          })
        })
      },
      praise() {
        this.$http.post('/praise', {
          aid: this.$route.query.aid
        }).then(dat => {
          this.article.praise++;
        })
      },
        timeago(dateTimeStamp){   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
          var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
          var hour = minute * 60;
          var day = hour * 24;
          var week = day * 7;
          var halfamonth = day * 15;
          var month = day * 30;
          var now = new Date().getTime();   //获取当前时间毫秒
          var diffValue = now - dateTimeStamp;//时间差

          if(diffValue < 0){
              return;
          }
          var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
          var hourC = diffValue/hour;
          var dayC = diffValue/day;
          var weekC = diffValue/week;
          var monthC = diffValue/month;
          if(monthC >= 1 && monthC <= 3){
              result = " " + parseInt(monthC) + "月前"
          }else if(weekC >= 1 && weekC <= 3){
              result = " " + parseInt(weekC) + "周前"
          }else if(dayC >= 1 && dayC <= 6){
              result = " " + parseInt(dayC) + "天前"
          }else if(hourC >= 1 && hourC <= 23){
              result = " " + parseInt(hourC) + "小时前"
          }else if(minC >= 1 && minC <= 59){
              result =" " + parseInt(minC) + "分钟前"
          }else if(diffValue >= 0 && diffValue <= minute){
              result = "刚刚"
          }else {
              var result='';
              var datetime = new Date();
              datetime.setTime(dateTimeStamp);
              var Nyear = datetime.getFullYear();
              var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
              var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
              var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
              var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
              var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
              result = Nyear + "-" + Nmonth + "-" + Ndate
          }
          return result;
      },
      loginCheck(){
        if(window.sessionStorage.getItem('loginFlag')){
          this.comment.god.id=window.sessionStorage.getItem('id');
        }
      },
      addComment(){
        this.article.comment++;
        this.$http.post('/addComment',this.comment).then(dat=>{
          this.commentsget=dat.data;
          this.newcommentsget=this.commentsget.slice(-this.pagesize).reverse();
          this.activeIndex=-1;
          this.comment.comment='';
        })
      },
      commentCheck(){
        this.$http.post('/commentCheck',this.comment).then(dat=>{
          this.commentsget=dat.data;
          this.newcommentsget=this.commentsget.slice(-this.pagesize).reverse();
          console.log(dat.data)
        })
      },
      gotop(){
        $(window).scrollTop(0);
      },
      clickreply(index,item){
        if(index==this.activeIndex){
          this.reply.content='';
          this.activeIndex=-1;
        }else{
          this.reply.content='';
          this.replyName='回复:'+item.god.name;
          this.reply.cid=item.cid;
          this.reply.toId=item.god.id;
          this.activeIndex = index;
        }
      },
      clickreply2(index,item){
        if(index==this.activeIndex2){
          this.activeIndex2=-1;
          this.reply.content='';
        }else{
          this.reply.content='';
          this.replyName='回复:'+item.fromName;
          this.reply.cid=item.cid;
          this.reply.toId=item.toId;
          this.activeIndex2 = index;
        }
      },
      addreply(index,cid){
        this.$http.post('/addReply',this.reply).then(dat=>{
          this.newcommentsget[index].replys++;
          this.activeIndex=-1;
          this.activeIndex2=-1;
          this.activeReply=-1;
          this.reply.content='';
          this.$message({
            message: '评论成功',
            type: 'success',
            duration: 1500,
            showClose: true
          });

        })
      },
      checkreply(cid,index){
        if(index==this.activeReply){
          this.activeReply=-1;
        }else{
          this.activeIndex2=-1;
          this.activeReply=index;
          this.$http.post('/selectReply',{'cid':cid}).then(dat=>{
            this.checkreplys=dat.data.reverse();
          })
        }
      }
    },
    mounted() {
      this.loginCheck();
      this.selectArticleDetail();
      this.commentCheck();
      this.gotop();
    }
  }
</script>

<style scoped="scoped">
  *{
    margin: 0;
    padding: 0;
  }
  .articleDetail {
    height: auto;
    width: 75%;
    margin: 0 auto;
    background-color: white;
  }

  .title {

  }

  span {
    margin: 0 20px 0 0;
  }

  .content {
    width: 85%;
    height: auto;
    min-height: 400px;
    margin: 0 auto;
  }

  .writecomment {
    width: 90%;
    margin: 0 auto;
  }

  .comment {
    height: 100%;
    width: 85%;
    margin: 0 auto;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    /* width: 80%; */
  }
  li{
    height: auto;
    border-bottom: 1px solid #C8CBCF;
  }
  a{
    text-decoration: none;
    color: blue;
  }
  a:hover{
    color: #000088;
  }
  .replyDiv{
    width: 95%;
    margin: 0 0 0 5%;

  }
</style>
<style>
img{
 width: 100%;
 }
</style>
