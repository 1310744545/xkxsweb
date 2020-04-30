<template>
  <div class="big">
    <div class="contain">

      <div class="block">
        <el-carousel height="450px" @change="carouselChange">
          <el-carousel-item v-for="item in carouselImg">
            <img :src="item.src" style="width: 100%;height: 100%;" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul>
        <li>
          <router-link :to="{name:'articleDetail',query:{aid:3}}" class="back">
            <img src="http://www.xkxxkx.cn:8080/lunbo/1.jpg" style="float: left;" />
            网站简介
          </router-link>
          <div style="margin: 0 0 0 48%;"> 自己做着玩的...</div>
        </li>
        <li>
          <router-link :to="{name:'articleDetail',query:{aid:4}}" class="back">
            <img src="http://www.xkxxkx.cn:8080/lunbo/0.jpg" style="float: right;" />
            内容与功能更新
          </router-link>
          <div style="margin: 0 0 0 2%;"> 暂无...</div>
        </li>
        <li>
          <router-link :to="{name:'articleDetail',query:{aid:2}}" class="back">
            <img src="http://www.xkxxkx.cn:8080/lunbo/2.jpg" style="float: left;" />
            网站持续优化中,Bug及优化意见反馈区
          </router-link>
          <div style="margin: 0 0 0 48%;"> 可以将遇到的bug或优化意见写在评论区,么么哒..</div>
        </li>
      </ul>
    </div>
    <div class="mymessage">
      <div class="introduce">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-s-opportunity"></i>介绍</div>
        </div>
        <span style="margin: 0 0 0 6%;">源码地址:前后端</span><br />
        <div style="word-wrap:break-word;height: 40px;width: 90%;margin: 0 auto;"><a class="msga" href="https://github.com/1310744545/xkxsweb"
            target="_blank">https://github.com/1310744545/xkxsweb</a></div>
        <div style="word-wrap:break-word;width: 90%;margin: 0 auto;"><a class="msga" href="https://github.com/1310744545/xkxsserver"
            target="_blank">https://github.com/1310744545/xkxsserver</a></div>
      </div>
      <div class="notice">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-message-solid"></i>公告</div>
        </div>
        <span style="font-size: 70px;padding: 0 0 0 20px;"> :)</span>
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
        carouselImg: [{
            src: 'http://www.xkxxkx.cn:8080/lunbo/0.jpg'
          },
          {
            src: 'http://www.xkxxkx.cn:8080/lunbo/1.jpg'
          },
          {
            src: 'http://www.xkxxkx.cn:8080/lunbo/2.jpg'
          },
          {
            src: 'http://www.xkxxkx.cn:8080/lunbo/3.jpg'
          },
          {
            src: 'http://www.xkxxkx.cn:8080/lunbo/4.jpg'
          },
        ]
      }
    },
    methods: {
      carouselChange(key1, key2) {}
    },
    mounted() {
      //div触碰顶部固定
      if (window.pageYOffset >= 80) {
        $('.mymessage').css('position', 'fixed')
        $('.mymessage').css('top', '0')
      } else {
        $('.mymessage').css('position', 'absolute')
        $('.mymessage').css('top', '80px')
      }
    }
  }
</script>

<style scoped="scoped">
  *{
    padding: 0;
    margin: 0;
  }
  .big {
    height: 100%;
  }

  .contain {
    height: 100%;
    width: 850px;
    padding: 0px;
    margin: 0 0 0 11%;
    float: left;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    height: 250px;
    list-style: none;
    margin: 10px 0 10px 0;
    padding: 0;
    background-color: white;
  }

  li img {
    height: 100%;
    width: auto;
  }

  li img:hover {
    transition: 0.5s;
    transform: scale(1.07, 1.07);
  }

  .block {
    box-shadow: 0 0px 3px 1px #C8CBCF;
  }

  .mymessage {
    height: 700px;
    width: 260px;
    margin: 0 0 0 67.7%;
    float: left;
  }

  .tital {
    color: purple;
    font-size: 25px;
    height: 100%;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    margin: auto 50% auto 0;
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

  .msga {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    color: black;
    font-size: 15px;
  }

  .msga:hover {
    color: blue;
  }

  .back {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    color: black;
    font-size: 25px;
    line-height: 80px;
    margin: 0 0 0 1%;
  }

  .back:hover {
    color: #880000;
  }
</style>
