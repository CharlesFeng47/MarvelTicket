<template>
  <div class="breadcrumb">
    <ul>
      <li><a href="/home">首页<span>&gt;</span></a></li>
      <li><a href="/schedule">话剧歌剧<span>&gt;</span></a></li>
      <li class="active">【广州站】孟京辉戏剧作品《一个陌生女人的来信》</li>
    </ul>
  </div>
</template>

<script>



  export default {
    name: 'home',
    components: {

    },
    data() {
      return {

      }
    },
    methods: {}
  }
</script>



<style rel="stylesheet/scss" lang="scss">
  .breadcrumb {
    float: left;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #aaa;
  ul{
    padding-left: 0px;
  }
  li{
    float: left;
    list-style-type: none!important;
    text-decoration: none;
    font-size: 14px;
    color: #aaa;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  }
</style>
