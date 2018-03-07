<template>
  <div class="bg_container">
    <div class="content_container">
      <el-steps :active="curStep" simple finish-status="success">
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="坐席信息" icon="el-icon-star-on"></el-step>
        <el-step title="完成" icon="el-icon-upload"></el-step>
      </el-steps>

      <transition name="fade">
        <router-view ref="child" v-on:next="handleNextStep"></router-view>
      </transition>

      <el-row type="flex" justify="space-around">
        <div class="but-group">
          <el-button @click="resetData" v-show="curStep===0||curStep===1" type="danger" round>重置</el-button>
          <el-button @click.native.prevent="handlePreStep" v-show="stepControl.preStep" type="info" round>上一步</el-button>
          <el-button @click.native.prevent="validateCurData" v-show="stepControl.nextStep" type="primary" round>下一步</el-button>
          <el-button @click.native.prevent="handlePublish" v-if="this.$route.meta.isNew&&stepControl.publish" type="danger" round>注册</el-button>
          <el-button @click.native.prevent="handleModify" v-if="!this.$route.meta.isNew&&stepControl.publish" type="danger" round>修改</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'SignUpIndex',
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
          this.$router.push('/spot_sign_up/step' + (this.curStep + 1))
        } else {
          // this.$router.push('/schedule/modify/' + this.$route.params.scheduleId + '/step' + (this.curStep + 1))
        }
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handlePublish: function() {
        new Promise((resolve, reject) => {
          // saveSchedule(this.token, this.basic_info_form, this.seat_price_map).then(response => {
          //   console.log(response)
          //   if (response.state === 'OK') {
          //     this.curStep++
          //     this.$store.dispatch('ResetSchedule', this.seatPriceMap).then(() => {
          //     }).catch(() => {
          //     })
          //   }
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        }).then(() => {
        }).catch(() => {
        })
      },
      handleModify: function() {
        new Promise((resolve, reject) => {
          // modifySchedule(this.token, this.$route.params.scheduleId, this.basic_info_form, this.seat_price_map).then(response => {
          //   console.log(response)
          //   if (response.state === 'OK') {
          //     this.curStep++
          //     this.$store.dispatch('ResetSchedule', this.seatPriceMap).then(() => {
          //     }).catch(() => {
          //     })
          //   }
          //   resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        }).then(() => {
        }).catch(() => {
        })
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
      var path = this.$route.fullPath
      var lastStartIndex = path.lastIndexOf('step')
      if (lastStartIndex < 0) this.curStep = 0
      else this.curStep = parseInt(path.substring(lastStartIndex + 4)) - 1
    },
    watch: {
      curStep: function(val, oldVal) {
        console.log('curStep 已改变')
        this.goStep(val)
      }
    }
  }
</script>

<style scoped>
  .bg_container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: #ffffff;
  }

  .content_container {
    margin: 20px;
  }

  .but-group{
    align-content: center;
    margin-top: 35px;
  }

</style>
