<template>
  <div class="carousel">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item v-for="(img,index) in recommendList" :key="index">
            <img v-bind:src="img.url"/>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(img,index) in recommendList" :key="index">
            <img v-bind:src="img.url"/>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    </div>
</template>

<script>
  export default {
    components: {},
    name: 'carousel',
    data() {
      return {
        recommendList: [
          {url:"http://images.ypiao.com/block/2017/20171220151847850.jpg"},
          {url:"http://images.ypiao.com/block/2018/20180531145110267.jpg"},
          {url:"http://images.ypiao.com/block/2017/20171220151847850.jpg"},
          {url:"http://images.ypiao.com/block/2018/20180531145110267.jpg"}
          ]
      }
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .carousel{
    margin-top: 10px;
  }
  .el-carousel__item {
    color: #475669;
    line-height: 45%;
    margin: 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__container{
    /*height: 250px;*/
    .el-icon-arrow-left{
      height: 40px;
      width: 20px;
      font-size: 45px;
    }
    .el-carousel__arrow--right{
      margin-right: 25px;
    }
    .el-icon-arrow-right{
      height: 40px;
      width: 20px;
      font-size: 45px;
    }
    .el-carousel__arrow{
      background-color: rgba(31,45,61,0);
    }
    .el-carousel__arrow:hover{
      background-color: rgba(31,45,61,0);
    }
  }

</style>
