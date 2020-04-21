<template>
  <div class="myarticle">
      <ul>
        <li></li>
      </ul>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        uid:window.sessionStorage.getItem('id')
      }
    },
    methods:{
      selectArticle(){
        this.$http.post('/selectArticle',{uid:this.uid}).then(dat=>{
          console.log(dat)
        })
      }
    },
    mounted(){
      this.selectArticle();
    }
  }

</script>

<style scoped="scoped">
  *{
    margin: 0;
    padding: 0;
  }
  .myarticle{
    height:auto;
    min-height:650px;
    width:70%;
    background:#bbeeeb;
    margin:0 auto;
  }
ul{
  list-style: none;
}
li{
  height: 10px;
}
</style>
