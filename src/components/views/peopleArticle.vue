<template>
  <div class="info">
      <span>{{uid}}</span>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        uid:this.$route.query.uid
      }
    },
    methods:{
      gotop(){
        $(window).scrollTop(0);
      }
    },
    mounted(){
      this.gotop()
      console.log(this.uid)
    }
  }
</script>

<style scoped="scoped">
.info{
  height: 800px;
  width: 50%;
  margin: 0 auto;
  background-color: white;
}
</style>
