<template>
  <div class="info">
      <div class="shengming"><h1>声明</h1></div>
      <div class="content">本站所有资源均来自网络,如有侵权,请联系删除</div>
      <!-- <span @click="testasd">asd</span> -->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        labelPosition:'left'
      }
    },
    methods:{
      testasd(){
        // this.$http.post('/testasd',{name:'大傻逼'})
      }
    }
  }
</script>

<style scoped="scoped">
  *{
    margin: 0;
    padding: 0;
  }
.info{
  height: 600px;
  width: 50%;
  margin: 0 auto;
  background-color: white;
}
.shengming{
  text-align:center;
  margin: 0 auto;
font-size: 30px;
}
.content{
  margin: 10% 0 0 0;
text-align:center
}
</style>
