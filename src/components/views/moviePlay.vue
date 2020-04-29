<template>
 <div>
    <div v-if="!flag" style="height: 600px;width: 100%;background-image: url(../../static/loading.gif);"></div>
    <div v-if="flag" class="play">
      <div style="text-align: center;">
        <el-button style="font-size: 12px;" type="success" plain @click="up">上一集</el-button>
        {{movieDetail.movieName}} 第{{movieContent[contentId-1].contentId}}集
        <el-button style="font-size: 12px;" type="success" plain @click="down">下一集</el-button>
      </div>
      <iframe :src="movieContent[contentId-1].contentUrl" scrolling="no" border="0" frameborder="no"
        framespacing="0" allowfullscreen="true"> </iframe>
       选集 <el-button @click="contentId=index+1" v-for="(item,index) in movieContent" type="success" plain>第{{index+1}}集</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        movieDetail:[],
        movieContent:[],
        movieId: this.$route.query.movieId,
        contentId: this.$route.query.contentId,
        flag: false
      }
    },
    methods: {
      selectMovieDetailByMovieId() {
        this.$http.post('/selectMovieDetailByMovieId', {
          movieId: this.movieId
        }).then(dat => {
          this.movieDetail = dat.data[0];
          this.flag = true
          this.movieContent=dat.data[0].movieContents.sort(this.asd);
          // console.log(dat.data[0].movieContents);
          console.log(dat.data[0].movieContents.sort(this.asd));
        })
      },
      asd(a,b){
        return a.contentId-b.contentId
      },
      up() {
        if (this.contentId >1 ) {
          this.contentId--;
        } else {
          this.$message({
            message: '已经是第一集啦',
            type: 'error',
            duration: 1500,
            showClose: true
          })
        }
      },
      down() {
        if (this.contentId < this.movieDetail.movieContents.length) {
          this.contentId++;
        } else {
          this.$message({
            message: '已经是最后一集啦',
            type: 'error',
            duration: 1500,
            showClose: true
          })
        }
      }
    },
    mounted() {
      this.selectMovieDetailByMovieId();
    }
  }
</script>

<style scoped="scoped">
  * {
    padding: 0;
    margin: 0;
  }

  .play {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 25px;
  }

  iframe {
    height: 600px;
    width: 100%;
    background-image: url(../../static/loading.gif);
    margin: 10px 0 20px 0;
  }
</style>
