<template>
  <div class="big">
    <div class="contain">
      <ul>
        <li v-if="!flag" style="width: 2000px;height: 500px;">

        </li>
      </ul>
      <ul v-for="item in newArticle" :key="item.aid" v-if="flag">
        <el-card shadow="hover" style="height: 100%;margin: 0 0 10px 0;">
          <li class="upli">
            <div class="title">
              <router-link :to="{name:'articleDetail',query:{aid:item.aid}}" style="font-size: 40px;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; display:block;" class="titlerouter">{{item.title}}</router-link>
              <div class="contentsmall" v-html="replaceImg(item.content)" style="width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; display:block;"></div>
            </div>
            <div class="message">
              <ul class="downul">
                <li style="width: auto;height: 36px;border-right:1px solid #DDDDDD">
                  <span style="float: left;line-height:36px;">
                    <router-link :to="{name:'PeopleArticle',query:{uid:item.god.id}}" style="text-decoration: none;color:#333;">
                      <el-row class="demo-avatar demo-basic" style="float: left;">
                        <el-col :span="12">
                          <el-avatar shape="square" :size="size" :src="item.god.headImg"></el-avatar>
                        </el-col>
                      </el-row>
                      {{item.god.name}}
                    </router-link>
                  </span>
                </li>
                <li style="width: 140px;height: 36px;">
                  <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">{{item.time}}</span>
                </li>
                <li style="width: 80px;height: 36px;float: right;">
                  <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">阅读数: <b style="color: #007BFF">{{item.read}}</b></span>
                </li>
                <li style="width: 80px;height: 36px;border-right:1px solid #DDDDDD;float: right;">
                  <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">点赞数: <b style="color: #007BFF">{{item.praise}}</b></span>
                </li>
                <li style="width: 80px;height: 36px;float: right;border-right:1px solid #DDDDDD;">
                  <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">评论数: <b style="color: #007BFF">{{item.comment}}</b></span>
                </li>
              </ul>

            </div>
          </li>
        </el-card>
      </ul>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="pagesize" layout="prev, pager, next, jumper" :total="article.length">
        </el-pagination>
      </div>

    </div>
    <div class="mymessage">
      <div class="introduce">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-s-opportunity"></i>介绍</div>
        </div>
        <span style="margin: 0 0 0 6%;">源码地址:前后端</span><br />
        <div style="word-wrap:break-word;height: 40px;width: 90%;margin: 0 auto;"><a style="text-decoration: none;color: black;font-size: 15px;"
            href="https://github.com/1310744545/xkxsweb" target="_blank">https://github.com/1310744545/xkxsweb</a></div>
        <div style="word-wrap:break-word;width: 90%;margin: 0 auto;"><a href="https://github.com/1310744545/xkxsserver"
            style="text-decoration: none;color: black;font-size: 15px;" target="_blank">https://github.com/1310744545/xkxsserver</a></div>
      </div>
      <div class="notice">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-message-solid"></i>公告</div>
        </div>
        <span style="font-size: 70px;padding: 0 0 0 20px;">:)</span>
      </div>
      <div class="contact">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;margin: 0 0 10px 0;text-align: center;font-size: 30px;">联系方式</div>
        <img src="http://www.xkxxkx.cn:8080/contain/qq.png" style="width: 130px;height: 130px;" />
        <img src="http://www.xkxxkx.cn:8080/contain/wechat.png" style="width: 130px;height: 130px;" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        article: [],
        size: 'small',
        pagesize: 10,
        currentPage: 1,
        newArticle: [],
        flag: false
      }
    },
    methods: {
      selectArtical() {
        this.$http.post('/selectAllArticle', {}).then(dat => {
          this.article = dat.data;
          this.newArticle = this.article.slice(-this.pagesize).reverse();
          this.flag = true
        })
      },
      replaceImg(msg) {
        var img = /<\/?.+?\/?>/g;
        var newmsg = msg.replace(img, '');
        // if (newmsg.length > 40)
        //   return newmsg.slice(0, 40) + '...'
        return newmsg
      },
      handleSizeChange() {

      },
      handleCurrentChange(val) {
        if (val == 1) {
          this.newArticle = this.article.slice(-(val) * this.pagesize).reverse();
        } else {
          this.newArticle = this.article.slice(-(val) * this.pagesize, -(val - 1) * this.pagesize).reverse();
        }
        this.gotop();
      },
      gotop() {
        $(window).scrollTop(0);
      }
    },
    mounted() {
      this.selectArtical();


      $('.mymessage').css('position', 'absolute')
      $('.mymessage').css('top', '80px')
      document.addEventListener('scroll', function() {
        if (window.pageYOffset >= 80) {
          $('.mymessage').css('position', 'fixed')
          $('.mymessage').css('top', '0')
        } else {
          $('.mymessage').css('position', 'absolute')
          $('.mymessage').css('top', '80px')
        }
      })
    }
  }
</script>

<style scoped="scoped">

  .big {
    width: 1500px;
    height: 100%;

  }

  .contain {
    height: auto;
    width: 850px;
    padding: 0px;
    margin: 0 0 0 11%;
    display: inline-block;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    height: 120px;
    list-style: none;
    margin: 0 0 10px 0;
    padding: 0;
  }


  .block {
    box-shadow: 0 0px 3px 1px #C8CBCF;
  }

  .mymessage {
    height: 700px;
    width: 260px;
    margin: 0 0 0 15px;
    display: inline-block;
  }

  .title {
    height: 100%;
    margin: auto 0 auto 0;
    padding: 10px 0 0 10px;
  }

  .introduce,
  .notice,
  .contact {
    width: 100%;
    background-color: white;
    margin: 0 0 10px 0;
    box-shadow: 0 0px 3px 1px #C8CBCF;
  }

  .introduce {
    height: 23%;
  }

  .notice {
    height: 23%;
  }

  .contact {
    height: 29%;
  }

  .titlerouter {
    text-decoration: none;
    font-size: 30px;
    font-family: 'Times New Roman', Times, serif;
    color: #007BFF;
  }

  .downul li {
    float: left;
  }

  .contentsmall {
    padding: 20px 0 0 0;
  }

  .tital {
    color: purple;
    font-size: 25px;
    height: 100%;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    margin: auto 50% auto 0;
  }

  .jieshao {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    color: #007BFF;
    font-size: 15px;
  }
  a:hover{
    color: blue;
  }
</style>
