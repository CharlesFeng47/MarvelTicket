<template>
  <div class="new-schedule">
    <el-steps :active="stepControl.step" simple finish-status="success">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="坐席价位" icon="el-icon-star-on"></el-step>
      <el-step title="发布" icon="el-icon-upload"></el-step>
    </el-steps>

    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>

    <div class="but-group">
      <el-button @click.native.prevent="handlePreStep" v-show="stepControl.preStep" type="info" round>上一步</el-button>
      <el-button @click.native.prevent="handleNextStep" v-show="stepControl.nextStep" type="primary" round>下一步</el-button>
      <el-button @click.native.prevent="handlePublish" v-show="stepControl.publish" type="danger" round>发布活动</el-button>
      <el-tag v-show="stepControl.step==3" type="success">已成功发布</el-tag>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'new-schedule',
    data: function() {
      return {
        stepControl: {
          preStep: false,
          nextStep: true,
          publish: false,
          step: 0
        }
      }
    },
    methods: {
      handlePreStep: function() {
        this.$router.go(-1)
        this.stepControl.step--
        this.goStep(this.stepControl.step)
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handleNextStep: function() {
        this.$router.push('/schedule/new_schedule/step' + (this.stepControl.step + 2))
        var _this = this
        this.stepControl.step++
        this.goStep(_this.stepControl.step)
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handlePublish: function() {
        this.stepControl.step++
        this.goStep(this.stepControl.step)
        console.log('发布')
      },
      goStep: function(n) {
        console.log(n)
        console.log(this.stepControl)
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
    }
  }

</script>
<style>
  .new-schedule .router-link {
    color: #fff
  }

  .new-schedule .but-group .el-button {
    margin-right: 20px
  }
</style>

