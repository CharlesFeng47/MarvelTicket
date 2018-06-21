<template>
  <div class="plan-panel">
    <div class="img-box">
      <a href="/detail" target="_blank">
        <img alt="项目海报"
             :src="scheduleBrief.posterSrc">
      </a>
      <div class="other-description">
        <div class="modal-panel">
          <div>{{ scheduleBrief.spot }}</div>
          <div>{{ scheduleBrief.time }}</div>
        </div>
      </div>
    </div>


    <div class="plan-description">
      <div class="description">
        {{ scheduleBrief.name }}
      </div>
      <div class="price">
        <label>¥ {{ scheduleBrief.basePrice }} </label>元起
        <span style="margin-top:1px ;float: right">{{ scheduleBrief.city }}</span>
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
    border: #E1E5E7 solid 1px;
    margin-top: 15px;
    padding: 10px;
    /*text-align: center;*/
  }
  .plan-panel:hover{
    box-shadow: 3px 3px 3px #E1E5E7;
  }
  .img-box{
    position: relative;
    width: 100%;
    /*max-height: 60%;*/
    height: 250px;
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
    /*margin: 0 auto;*/
    vertical-align: middle;
    /*word-break:keep-all;!* 不换行 *!*/
    /*white-space:nowrap;!* 不换行 *!*/
    overflow:hidden;
    max-lines: 2;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*text-align: center;*/
    font: 14px "Microsoft YaHei";
    margin: 6px 0 6px ;
  }
  .plan-description .price{
    margin: 0 auto;
    vertical-align: middle;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;
    font-size: 13px;
  }
  .plan-description .price label{
    color: #F78978;
    font-size: 16px;
  }
  .other-description{
    /*color: rgba(49,125,243,0.8);*/
    background-color: rgba(245,108,108,0.8);
    z-index: 10;
    width: 100%;
    position: absolute;
    transition: margin-top 0.5s;
  }
  .other-description .modal-panel div{
    max-lines: 1;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow:hidden;
    height: 29px;
    width: 100%;
    color:whitesmoke;
    /*padding-left: 20px;*/
    padding-top: 4px;
    background-color: rgba(49,125,243,0.1);
    line-height: 25px;

  }
  .img-box:hover .other-description{
    margin-top: -58px;
  }

</style>
