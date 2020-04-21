<template>
  <div class="big">
    <div class="contain">
      <ul>
        <div class="block">
          <el-carousel height="450px" @change="carouselChange">
            <el-carousel-item v-for="item in carouselImg" >
              <img :src="item.src" style="width: 100%;height: 100%;" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="mymessage">
      <div class="introduce">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-s-opportunity"></i>介绍</div>
        </div>
      </div>
      <div class="notice">
        <div style="border-bottom: #C8CBCF 1px solid;height: 36px;padding: 4%;">
          <div class="tital"><i class="el-icon-message-solid"></i>公告</div>
        </div>
      </div>
      <div class="contact">
        <span></span>
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
    mounted(){
      $('.mymessage').css('position', 'fixed')
    }
  }
  //div触碰顶部固定
  $(function() {
    document.addEventListener('scroll', function() {
      if (window.pageYOffset >= 80) {
        $('.mymessage').css('position', 'fixed')
        $('.mymessage').css('top', '0')
      } else {
        $('.mymessage').css('position', 'absolute')
        $('.mymessage').css('top', '80px')
      }
    })
  })
</script>

<style scoped>
  .big{
    height: 100%;
  }
  .contain {
    height:100%;
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
  }

  li:nth-child(even) {
    background-color: #B1DFBB;
  }

  li:nth-child(odd) {
    background-color: yellow;
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

</style>
