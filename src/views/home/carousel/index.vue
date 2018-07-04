<template>
  <div class="carousel">
    <el-row class="carousel1">
      <el-col :span="22" :offset="1">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item v-for="(img,index) in recommendList" :key="index">
            <a href="/detail" target="_blank">
              <img v-bind:src="img.url"/>
            </a>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getSowingMapUrl } from '../../../api/program'
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    name: 'carousel',
    computed: {
      ...mapGetters([
        'cur_city'
      ])
    },
    watch: {
      cur_city: {
        handler: function(newVal, oldVal) {
          this.initSowing()
        }
      }
    },
    data() {
      return {
        recommendList: [
        //   { url: require('../../../assets/【上海站】《2018光辉岁月致敬黄家驹》逝世25周年纪念演唱会.jpg')},
        //   { url: require('../../../assets/【南京站】2018德云社全国巡演》.jpg') },
        //   { url: require('../../../assets/【南京站】喜剧《蒋公的面子》.jpg') },
        //   { url: require('../../../assets/【南京站】2018谢天笑“那不是我”巡回演唱会.jpg') },
        //   { url: require('../../../assets/【南京站】阿加莎推理巨作《谋杀启事》.jpg') },
        ]
      }
    },
    mounted: function () {
      this.initSowing()
    },
    methods: {
      initSowing() {
        new Promise((resolve, reject) => {
          getSowingMapUrl(this.cur_city).then(curPrograms => {
            console.log((curPrograms))
            this.recommendList = curPrograms
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.curTypeSchedulesLoading = false
        }).catch(() => {
          this.curTypeSchedulesLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .carousel {
    margin-top: 10px;
  }

  .el-carousel__item {
    color: #475669;
    line-height: 45%;
    margin: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .carousel1 .el-carousel__container .is-active{
    margin-left: -5%;
    width: 60%;
  }
  .el-carousel__container {
    /*height: 250px;*/
    .el-icon-arrow-left {
      height: 40px;
      width: 20px;
      font-size: 45px;
    }
    .el-carousel__arrow--right {
      margin-right: 25px;
    }
    .el-icon-arrow-right {
      height: 40px;
      width: 20px;
      font-size: 45px;
    }
    .el-carousel__arrow {
      background-color: rgba(31, 45, 61, 0);
    }
    .el-carousel__arrow:hover {
      background-color: rgba(31, 45, 61, 0);
    }
  }

</style>
