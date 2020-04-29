<template>
  <div class="info">
    <div v-if="!ListFlag" style="width: 2000px;height: 2000px;"></div>
    <div v-if="ListFlag" class="movieList">
      <div class="movie" v-for="item in movieList">
        <router-link :to="{name:'MovieDetail',query:{movieId:item.movieId}}">
          <div>
            <img :src="item.movieImg" class="movieImg"/>
          </div>
          <span>{{item.movieName}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        movieList:[],
        ListFlag:false
      }
    },
    methods:{
      selectMoves(){
        this.$http.post('/selectMoves',null).then(dat=>{
          this.movieList=dat.data;
          this.ListFlag=true;
        })
      }
    },
    mounted() {
      this.selectMoves();
    }
  }
</script>

<style scoped="scoped">
  *{
    margin: 0;
    padding: 0;
  }
iframe{
  width: 60%;
  height:700px;
}
.info{
  width: 60%;
  height: 100%;
  margin: 0 auto;

}
.movieList{
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0 0 30px 0;
}
.movie{
  width: auto;
  display: inline-block;
  padding: 25px 0 0 35px;
  text-align: center;
}
.movieImg{
  height: 200px;
  width: auto;
}
a{
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  color: black;
}
a:hover{
  color: blue;
}
</style>
