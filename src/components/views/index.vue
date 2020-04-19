<template>
  <div>
    <div class="contain">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="mymessage">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

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
  div {
    text-align: center;
  }

  .contain {
    height: 100%;
    width: 58%;
    padding: 0px;
    margin: 0px;
    position: absolute;
    left: 10%;
  }

  .mymessage {
    height: 500px;
    width: 18%;
    background-color: burlywood;
    position: absolute;
    left: 69%;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    height: 200px;
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  li:nth-child(even) {
    background-color: #B1DFBB;
  }

  li:nth-child(odd) {
    background-color: yellow;
  }
</style>
