<template>
  <div class="myarticle">
    <div class="godinfo" v-if="article[0]">
      <ul class="godinfoul">
        <li style="margin: 10px auto 10px auto;">
          <img style="width: 150px;height: 150px;border-radius: 50%;" :src="article[0].god.headImg" />
        </li>
        <li><span style="line-height:36px;"><i class="el-icon-user-solid" style="color: #0000FE;"></i>
            {{article[0].god.name}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-position" style="color: #0000FE;"></i>
            {{article[0].god.email}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-location-information" style="color: #0000FE;"></i>
            {{article[0].god.url}}</span></li>
        <li><span style="line-height:36px;"><i class="el-icon-edit-outline" style="color: #0000FE;"></i>
            {{article[0].god.introduction}}</span></li>
      </ul>
    </div>
    <div class="article">
      <ul class="upli" v-if="!articleFlag">
        <li style="font-size: 80px;line-height: 160px;">该用户很懒啥也没写</li>
      </ul>
      <ul v-for="item in newArticle" :key="item.aid" v-if="articleFlag">
        <li class="upli">
          <div class="title">
            <router-link :to="{name:'articleDetail',query:{aid:item.aid}}">{{item.title}}</router-link>
            <div class="contentsmall" v-html="replaceImg(item.content)"></div>
          </div>
          <div class="message">
            <ul class="downul">
              <li style="width: auto;height: 36px;border-right:1px solid #DDDDDD">
                <span style="float: left;">
                  <router-link :to="{name:'PeopleArticle',query:{uid:item.god.id}}" style="text-decoration: none;color:#333;font-size: 16px;line-height: 36px;">
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
              <li style="width: 80px;height: 36px;border-right:1px solid #DDDDDD;float: right;">
                <span style="display:block;text-align:center;font-size: 14px;line-height:36px;">评论数: <b style="color: #007BFF">{{item.comment}}</b></span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="pagesize" layout="prev, pager, next, jumper" :total="article.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        article: [],
        articleFlag: true,
        size: 'small',
        pagesize: 6,
        currentPage: 1,
        newArticle: []
      }
    },
    methods: {
      gotop() {
        $(window).scrollTop(0);
      },
      selectArticleAndGodByUid() {
        this.$http.post('/selectArticleAndGodByUid', {
          id: this.$route.query.uid
        }).then(dat => {
          if (dat.data.length != 0) {
            this.articleFlag = true;
          } else {
            this.articleFlag = false;
          }
          this.article = dat.data;
          this.newArticle = this.article.slice(-this.pagesize).reverse();
        })
      },
      replaceImg(msg) {
        var img = /<\/?.+?\/?>/g;
        var newmsg = msg.replace(img, '');
        if (newmsg.length > 40)
          return newmsg.slice(0, 40) + '...'
        return newmsg
      },
      handleSizeChange() {

      },
      handleCurrentChange(val) {
        console.log(val)
        if (val == 1) {
          this.newArticle = this.article.slice(-(val) * this.pagesize).reverse();
        } else {
          this.newArticle = this.article.slice(-(val) * this.pagesize, -(val - 1) * this.pagesize).reverse();
        }
        $(window).scrollTop(0);
      }
    },
    mounted() {
      this.gotop();
      this.selectArticleAndGodByUid();
    }
  }
</script>

<style scoped="scoped">
  * {
    margin: 0;
    padding: 0;
  }

  .godinfoul {
    display: table;
    margin-left: auto;
    margin-right: auto;
  }

  .godinfoul li {
    height: auto;
    padding: auto;
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

  .block {
    margin: 0 0 0 30%;
  }
</style>
