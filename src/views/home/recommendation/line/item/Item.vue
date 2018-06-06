<template>
  <div class="plan-panel">
    <div class="img-box">
      <img v-bind:src=url>
    </div>
    <!--<div class="other-description" hidden>-->
    <!--<div class="modal-panel">-->
    <!--<div>&nbsp;<i class="icon-map-marker"></i>&nbsp;&nbsp;<label>南体二院</label></div>-->
    <!--<div><i class="icon-time"></i>&nbsp;<label>10.22 22:10</label></div>-->
    <!--</div>-->
    <!--</div>-->

    <div class="plan-description">
      <div class="description">
        世界经典原版音乐剧《猫Cats 北京站12222222
      </div>
      <div class="price">
        <label>票价： ¥</label>380<label> 元左右</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    components: {},
    data() {
      return {
        url: 'https://api.ypiao.com/event/cover.json?event_code=41947964e392efcf6b95c43e9aacba20&platform=6&w=196&h=252&q=80'
      }
    },
    methods: {}
  }
</script>


<style scoped>
  .plan-panel {
    background-color: white;
    border-radius: 3px;
    border: wheat solid 1px;
    margin-top: 15px;
    padding: 10px;
    /*text-align: center;*/
  }

  .img-box {
    width: 100%;
    /*height: 230px;*/
    line-height: 180px;
    text-align: center;
  }

  .img-box img {
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }

  .img-box img:hover {
    cursor: pointer;
  }

  .plan-description {
    width: 100%;
    /*height: 60px;*/
    /*line-height: 30px;*/
    /*text-align: center;*/
  }

  .plan-description .description {
    margin: 0 auto;
    vertical-align: middle;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden;
    /*text-align: center;*/
    font: 12px/1.5 "Microsoft YaHei";
  }

  .plan-description .price {
    margin: 0 auto;
    vertical-align: middle;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden;
    /*text-align: center;*/
    font: 12px/1.5 "Adobe 楷体 Std R";
  }

  .plan-description .price label {
    color: #b399a6;
  }

  .other-description {
    text-align: left;
    /*margin: 0 auto;*/
    padding-left: 4%;
    padding-right: 5%;
    width: 87%;
    height: 30px;
    position: absolute;
    margin-top: -55px
  }

  .other-description .modal-panel {
    height: 52px;
    width: 100%;
    color: whitesmoke;
    padding-left: 20px;
    padding-top: 5px;
    background-color: rgba(49, 125, 243, 0.8);
  }

</style>
