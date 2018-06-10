<template>
  <div class="order-nav">
    <ul>
      <li class="active"><a href="">全部订单<div class="border-bottom"></div></a></li>
      <li><a href="">未支付<div class="border-bottom"></div></a></li>
      <li><a href="">待配票<div class="border-bottom"></div></a></li>
      <li><a href="">已取消<div class="border-bottom"></div></a></li>
      <li style="display: inline-block;padding-left:100%;"></li>
    </ul>
  </div>

</template>

<script>
  export default {
    components: {},
    name: 'Order-nav',
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .order-nav {
    margin: 0px auto;
    /*padding-top: 40px;*/
    width: 90%;
    padding: 0 30px 26px 30px;
    border-bottom: 3px solid #EEEEEE;
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
    ul > li {
      display: inline-block;
      color: #331612;
    }

    ul > li > a:hover {
      cursor: pointer;
      color: #f2593f;
      .border-bottom {
        display: block;
      }
    }
    .active {
      .border-bottom {
        display: block;
      }
      color: #f2593f;
      display: inline-block;
    }
    .border-bottom {
      display: none;
      position: relative;
      top: 4px;
      height: 3px;
      width: 100%;
      background-color: #f2593f;
      border-radius: 2px;
    }
  }
</style>
