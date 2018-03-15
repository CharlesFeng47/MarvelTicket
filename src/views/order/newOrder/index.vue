<template>
  <div>
    <h1>下达订单</h1>

    <el-steps :active="curStep" simple finish-status="success">
      <el-step title="选座订票" icon="el-icon-edit"></el-step>
      <el-step title="支付账单" icon="el-icon-loading"></el-step>
    </el-steps>

    <transition name="fade">
      <router-view :cur-step.sync="curStep" ref="child" v-on:next="handleNextStep" class="view"></router-view>
    </transition>

    <el-row type="flex" justify="space-around">
      <div class="but-group">
        <el-button @click="resetData" v-show="curStep===0" type="danger" round>重置</el-button>
        <el-button @click.native.prevent="validateCurData" v-show="curStep===0" type="primary" round>下达订单</el-button>
        <el-button @click.native.prevent="handlePublish" v-if="curStep===1" type="danger" round>去支付</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    name: 'NewOrder',
    computed: {
      ...mapGetters([
        'token',
        'basic_info_form',
        'seat_price_map'
      ])
    },
    data: function() {
      return {
        curStep: 0
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
      handleNextStep: function() {
        this.curStep++
        this.$router.push('/order/new_order/step' + (this.curStep + 1))
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
      }
    },
    created: function() {
      // 直接访问的时候，取其step
      // /schedule/new_schedule/step2
      var path = this.$route.fullPath
      var lastStartIndex = path.lastIndexOf('step')
      if (lastStartIndex < 0) this.curStep = 0
      else this.curStep = parseInt(path.substring(lastStartIndex + 4)) - 1
    },
    beforeRouteLeave: function(to, from, next) {
      if (to.meta.isNew !== from.meta.isNew) {
        this.$store.dispatch('ResetSchedule').then(() => {
          this.curStep = 0
          console.log('reset the new schedule view stored data')
        }).catch(() => {
        })
      }
      next()
    }
  }
</script>

<style scoped>
  .but-group{
    align-content: center;
    margin-top: 35px;
  }
</style>
