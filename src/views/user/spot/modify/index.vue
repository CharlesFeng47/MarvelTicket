<template>
  <div class="bg_container">
    <div class="content_container">
      <el-steps :active="curStep" simple finish-status="success">
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="坐席信息" icon="el-icon-star-on"></el-step>
        <el-step title="完成并预览" icon="el-icon-upload"></el-step>
      </el-steps>

      <transition name="fade">
        <router-view ref="child" v-on:next="handleNextStep"></router-view>
      </transition>

      <el-row type="flex" justify="space-around">
        <div class="but-group">
          <el-button @click="resetData" v-show="curStep===0||curStep===1" type="danger" round>重置</el-button>
          <el-button @click.native.prevent="handlePreStep" v-show="stepControl.preStep" type="info" round>上一步</el-button>
          <el-button @click.native.prevent="validateCurData" v-show="stepControl.nextStep" type="primary" round>下一步</el-button>
          <el-button @click.native.prevent="handleSignUp" :loading="signUpLoading" v-if="this.$route.meta.isNew&&stepControl.publish" type="danger" round>注册</el-button>
          <el-button @click.native.prevent="handleModify" v-if="!this.$route.meta.isNew&&stepControl.publish" type="danger" round>修改</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { spotModify } from '../../../../api/user'

  export default {
    name: 'SpotModifyIndex',
    computed: {
      ...mapGetters([
        'token',
        'spot_basic',
        'spot_seats_map',
        'cur_seat_type_count',
        'seat_names'
      ])
    },
    data: function() {
      return {
        curStep: 0,
        stepControl: {
          preStep: false,
          nextStep: true,
          publish: false
        },

        signUpLoading: false
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
          this.$router.push('/user_info/modify_spot/step' + (this.curStep + 1))
        }
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handleSignUp: function() {
        this.signUpLoading = true
        this.$store.dispatch('SpotSignUp', {
          spot_basic: this.spot_basic,
          spot_seats_map: this.spot_seats_map,
          cur_seat_type_count: this.cur_seat_type_count,
          seat_names: this.seat_names
        }).then(() => {
          this.signUpLoading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.signUpLoading = false
        })
      },
      handleModify: function() {
        console.log(this.spot_basic)
        new Promise((resolve, reject) => {
          spotModify(this.token, this.spot_basic, this.spot_seats_map, this.cur_seat_type_count, this.seat_names).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              Message({
                message: '您已成功修改场馆信息！',
                type: 'success',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
              resolve()
            } else if (response.state === 'ALIPAY_ENTITY_NOT_EXIST') {
              Message({
                message: '此支付宝账号不存在，请检查后重新注册！',
                type: 'error',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
              reject()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.$router.push({ path: '/user_info' })
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
