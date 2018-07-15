<template>
  <div class="carousel">
    <el-row class="carousel1">
      <el-col :span="22" :offset="1">
        <el-carousel indicator-position="outside" type="card">
          <el-carousel-item v-for="(item,index) in recommendList" :key="index">
            <a :href="item.id" target="_blank">
              <img v-bind:src="item.url"/>
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
          this.recommendList = []
          this.initSowing()
        }
      }
    },
    data() {
      return {
        recommendList: []
      }
    },
    mounted: function() {
      this.initSowing()
    },
    methods: {
      initSowing() {
        new Promise((resolve, reject) => {
          getSowingMapUrl(this.cur_city).then(curPrograms => {
            console.log((curPrograms))
            for (var key in curPrograms) {
              if (key === '56-1532772000000') {
                continue
              }
              var res = {}
              res.id = '/detail/' + key
              res.url = curPrograms[key]
              this.recommendList.push(res)
            }
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

  .carousel1 .el-carousel__container .is-active {
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
      color: #e16349;
    }
    .el-carousel__arrow:hover {
      background-color: rgba(31, 45, 61, 0);
    }
  }

</style>
