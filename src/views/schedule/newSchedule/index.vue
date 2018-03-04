<template>
  <div class="new-schedule">
    <el-steps :active="curStep" simple finish-status="success">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="坐席价位" icon="el-icon-star-on"></el-step>
      <el-step title="完成" icon="el-icon-upload"></el-step>
    </el-steps>

    <transition name="fade">
      <router-view :cur-step.sync="curStep" ref="child" v-on:next="handleNextStep" class="view"></router-view>
    </transition>

    <el-row type="flex" justify="space-around">
      <div class="but-group">
        <el-button @click="resetData" v-show="curStep===0||curStep===1" type="danger" round>重置</el-button>
        <el-button @click.native.prevent="handlePreStep" v-show="stepControl.preStep" type="info" round>上一步</el-button>
        <el-button @click.native.prevent="validateCurData" v-show="stepControl.nextStep" type="primary" round>下一步</el-button>
        <el-button @click.native.prevent="handlePublish" v-if="this.$route.meta.isNew&&stepControl.publish" type="danger" round>发布计划</el-button>
        <el-button @click.native.prevent="handlePublish" v-if="!this.$route.meta.isNew&&stepControl.publish" type="danger" round>修改计划</el-button>
        <el-tag v-if="this.$route.meta.isNew&&curStep==3" type="success">已成功发布</el-tag>
        <el-tag v-if="!this.$route.meta.isNew&&curStep==3" type="success">已成功修改</el-tag>
      </div>
    </el-row>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { getUser } from '../../../api/user'

  export default {
    name: 'new-schedule',
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data: function() {
      return {
        curStep: 0,
        stepControl: {
          preStep: false,
          nextStep: true,
          publish: false
        }
      }
    },
    methods: {
      // 验证之后合法，由子组件调用handleNextStep调转
      validateCurData: function() {
        this.$refs.child.validateData()
      },
      // 调用子组件提供的统一的数据重置方法
      resetData() {
        this.$refs.child.resetData()
      },
      handlePreStep: function() {
        this.curStep--
        this.$router.go(-1)
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handleNextStep: function() {
        this.curStep++
        if (this.$route.meta.isNew) {
          this.$router.push('/schedule/new_schedule/step' + (this.curStep + 1))
        } else {
          this.$router.push('/schedule/modify/' + this.$route.params.scheduleId + '/step' + (this.curStep + 1))
        }
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handlePublish: function() {
        this.curStep++
        console.log('发布')
      },
      goStep: function(n) {
        switch (n) {
          case 0 :
            this.stepControl.preStep = false
            this.stepControl.nextStep = true
            this.stepControl.publish = false
            break
          case 1 :
            this.stepControl.preStep = true
            this.stepControl.nextStep = true
            this.stepControl.publish = false
            break
          case 2 :
            this.stepControl.preStep = true
            this.stepControl.nextStep = false
            this.stepControl.publish = true
            break
          case 3 :
            this.stepControl.preStep = false
            this.stepControl.nextStep = false
            this.stepControl.publish = false
            break
        }
      }
    },
    created: function() {
      // 直接访问的时候，取其step
      // /schedule/new_schedule/step2
      var path = this.$route.fullPath
      var lastStartIndex = path.lastIndexOf('step')
      if (lastStartIndex < 0) this.curStep = 0
      else this.curStep = parseInt(path.substring(lastStartIndex + 4)) - 1

      // 同时向后端发出请求获取此场馆的座位信息初始化store
      new Promise((resolve, reject) => {
        getUser(this.token).then(response => {
          console.log(response)
          if (response.state === 'OK') {
            const curSpot = JSON.parse(response.object)

            var seatMapForPrice = []
            var curSpotSeats = curSpot.seatInfos
            for (var i = 0; i < curSpotSeats.length; i++) {
              var curSeat = curSpotSeats[i]
              seatMapForPrice[i] = {}
              seatMapForPrice[i].seatName = curSeat.seatName
              seatMapForPrice[i].seatNum = curSeat.num
              seatMapForPrice[i].seatPrice = ''
            }

            this.$store.dispatch('ChangeSeatPriceMap', seatMapForPrice).then(() => {
            }).catch(() => {
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
      }).catch(() => {
      })
    },
    watch: {
      $route: function(newRoute, oldRoute) {
        console.log('watch route change')
        // watch 当前路由和之前的路由的isNew是否相同，不同则将路由按钮初始化为默认值
        if (newRoute.meta.isNew !== oldRoute.meta.isNew) {
          this.curStep = 0
          console.log('meta.isNew has changed, reset the stepControl data')
        }
      },
      curStep: function(val, oldVal) {
        console.log('curStep 已改变')
        this.goStep(val)
      }
    }
  }

</script>
<style>
  .new-schedule .router-link {
    color: #fff
  }

  .but-group{
    align-content: center;
    margin-top: 35px;
  }
</style>

