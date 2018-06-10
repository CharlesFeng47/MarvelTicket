<template>
  <div class="container">
    <ul>
      <li class="active"><a href="">首页<div class="border-bottom"></div></a></li>
      <li><a href="">演唱会<div class="border-bottom"></div></a></li>
      <li><a href="">音乐会<div class="border-bottom"></div></a></li>
      <li><a href="">舞蹈芭蕾<div class="border-bottom"></div></a></li>
      <li><a href="">话剧歌剧<div class="border-bottom"></div></a></li>
      <li><a href="">曲艺杂谈<div class="border-bottom"></div></a></li>
      <li><a href="">体育赛事<div class="border-bottom"></div></a></li>
      <li><a href="">儿童亲子<div class="border-bottom"></div></a></li>
      <li><a href="">展览休闲<div class="border-bottom"></div></a></li>
      <li style="display: inline-block;padding-left:100%;"></li>
    </ul>
  </div>

</template>

<script>
  export default {
    components: {},
    name: 'navigate',
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    margin: 0px auto;
    padding-top: 40px;
    padding-bottom: 20px;
    width: 77%;
  }
    ul {
      list-style: none;
      text-align: justify;
      margin: 0;
      padding: 0;
      width: 100%;
      float: left;
      height: 62px;
      overflow: hidden;
    }
    /*li {*/

      /*list-style-type: none !important;*/
    /*}*/
    ul > li > a {
      text-decoration: none;
      font-size: 19px;
      position: relative;
      display: block;
      cursor: pointer;
    }
    ul >li{
      display: inline-block;
      color: #331612;
    }

    ul > li > a:hover {
      cursor: pointer;
      color: #f2593f;
      .border-bottom{
        display: block;
      }
    }
    .active {
      .border-bottom{
        display: block;
      }
      color: #f2593f;
      display: inline-block;
    }
    .border-bottom {
      display: none;
      position: relative;
      top: 4px;
      height: 4px;
      width: 100%;
      background-color: #f2593f;
      border-radius: 2px;
    }

</style>
