<template>
  <div>
    <div v-if="!movieFlag" style="width: 2000px;height: 2000px;"></div>
    <div v-if="movieFlag" class="movieDetail">
      <div class="movieImg">
        <img :src="movieDetail.movieImg" />
      </div>
      <div class="movieMessage">
        <div>
          <div><b>片名:</b></div>
          <div>{{movieDetail.movieName}}</div>
        </div>
        <div>
          <div><b>导演:</b></div>
          <div>{{movieDetail.directors}}</div>
        </div>
        <div>
          <div><b>编剧:</b></div>
          <div>{{movieDetail.screenWriters}}</div>
        </div>
        <div>
          <div><b>主演:</b></div>
          <div>{{movieDetail.stars}}</div>
        </div>
        <div>
          <div><b>类型:</b></div>
          <div>{{movieDetail.type}}</div>
        </div>
        <div>
          <div><b>IMDB编码:</b></div>
          <div>{{movieDetail.imdb}}</div>
        </div>
        <div>
          <div><b>评分:</b></div>
          <div>{{movieDetail.score}}</div>
        </div>
      </div>
      <div class="play">
        <div style="margin: 0 0 10px 0;"><b>在线播放</b></div>
        <el-button @click="play(movieDetail.movieId,item.contentId)" size="small" type="success" plain v-for="(item,index) in movieDetail.movieContents">第{{index+1}}集</el-button>
      </div>
      <div class="introduction">
        <div style="margin: 0 0 10px 0;"><b>故事简介</b></div>
        <div>{{movieDetail.introduction}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        movieId: this.$route.query.movieId,
        movieFlag: false,
        movieDetail: []
      }
    },
    methods: {
      selectMovieDetailByMovieId() {
        this.$http.post('/selectMovieDetailByMovieId', {
          movieId: this.movieId
        }).then(dat => {
          this.movieDetail = dat.data[0];
          this.movieFlag = true;
        })
      },
      play(movieId, contentId) {
        this.$router.push({
          path: '/index/MoviePlay',
          query: {
            movieId: movieId,
            contentId: contentId
          }
        })
      }
    },
    mounted() {
      this.selectMovieDetailByMovieId();
    }
  }
</script>

<style scoped>
  .movieDetail {
    width: 60%;
    height: auto;
    background-color: white;
    margin: 0 auto;
    vertical-align: top;
  }

  .movieImg {
    width: 40%;
    padding: 2% 0 0 2%;
    display: inline-block;
    vertical-align: top;
  }

  .movieMessage {
    height: 100%;
    width: 55%;
    padding: 2% 0 0 2%;
    display: inline-block;
    vertical-align: top;
    font-size: 15px;
  }

  .movieMessage div div {
    display: inline-block;
    margin: 0 0 7px 0;
  }

  .play {
    height: auto;
    width: 100%;
    padding: 10px 0 10px 1%;
  }

  .introduction {
    height: auto;
    width: 98%;
    padding: 10px 0 40px 1%;
    margin: 0 auto;
  }
</style>
