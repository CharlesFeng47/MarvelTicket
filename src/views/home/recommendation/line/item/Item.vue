<template>
  <div class="plan-panel">
    <div class="img-box">
      <a href="/detail" target="_blank">
        <img alt="项目海报"
             :src="scheduleBrief.posterSrc">
      </a>
      <div class="other-description">
        <div class="modal-panel">
          <div><i class="icon-map-marker"></i><label>{{ scheduleBrief.spot }}</label></div>
          <div><i class="icon-time"></i><label>{{ scheduleBrief.time }}</label></div>
        </div>
      </div>
    </div>


    <div class="plan-description">
      <div class="description">
        {{ scheduleBrief.name }}
      </div>
      <div class="price">
        <label>票价： ¥</label>{{ scheduleBrief.basePrice }}<label> 元左右</label>
        <span style="float: right">{{ scheduleBrief.city }}</span>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    props: [
      'scheduleBrief'
    ],
    data() {
      return {
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
  .plan-panel:hover{
    box-shadow: 0 0 10px wheat;
  }
  .img-box{
    position: relative;
    width: 100%;
    /*height: 230px;*/
    text-align: center;
    /*height: 250px;*/
    overflow: hidden;
  }
  .img-box img{
    /*line-height: 200px;*/
    height: 100%;
    width: 100%;
    vertical-align: middle;
    z-index: 1;
  }
  .img-box img:hover{
    cursor: pointer;
  }
  .plan-description{
    width: 100%;
  }
  .plan-description .description{
    margin: 0 auto;
    vertical-align: middle;
    /*word-break:keep-all;!* 不换行 *!*/
    /*white-space:nowrap;!* 不换行 *!*/
    overflow:hidden;
    max-lines: 2;
    /*text-align: center;*/
    font: 15px "Microsoft YaHei"
  }
  .plan-description .price{
    margin: 0 auto;
    vertical-align: middle;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;
    /*text-align: center;*/
    font-size: 15px;
  }
  .plan-description .price label{
    color: #b399a6;
  }
  .other-description{
    /*color: rgba(49,125,243,0.8);*/
    background-color: rgba(245,108,108,0.8);
    z-index: 10;
    width: 100%;
    position: absolute;
    transition: margin-top 0.5s;
  }
  .other-description .modal-panel{
    /*height: 52px;*/
    width: 100%;
    color:whitesmoke;
    /*padding-left: 20px;*/
    padding-top: 4px;
    background-color: rgba(49,125,243,0.1);
    line-height: 25px;
  }
  .img-box:hover .other-description{
    margin-top: -54px;
  }

</style>
