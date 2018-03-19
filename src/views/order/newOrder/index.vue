<template>
  <div>
    <el-steps :active="curStep" simple finish-status="success">
      <el-step title="选座订票" icon="el-icon-edit"></el-step>
      <el-step title="预览账单" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="支付账单" icon="el-icon-loading"></el-step>
    </el-steps>

    <transition name="fade">
      <keep-alive>
        <router-view :cur-step.sync="curStep" :schedule-detail="scheduleDetail"
                     ref="child" v-on:next="handleNextStep" class="view">
        </router-view>
      </keep-alive>
    </transition>

    <el-row type="flex" justify="space-around">
      <div class="but-group">
        <el-button @click="resetData" v-show="curStep===0" type="danger" round>重置</el-button>
        <el-button @click.native.prevent="handlePreStep" v-show="curStep===1" type="info" round>上一步</el-button>
        <el-button @click.native.prevent="handleOrder" v-show="curStep===1" type="danger" round>下达订单</el-button>
        <el-button @click.native.prevent="validateCurData" v-show="curStep===0" type="primary" round>下一步</el-button>
        <el-button @click.native.prevent="handlePay" v-show="curStep===2" type="danger" round>去付款</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getSchedule } from '../../../api/schedule'
  import { saveOrder } from '../../../api/order'

  export default {
    name: 'NewOrder',
    computed: {
      ...mapGetters([
        'token',

        'order_type',

        'order_num',
        'order_seat_name',
        'order_price',

        'choose_seats',
        'choose_seats_count',

        'order_did_use_coupon',
        'order_used_coupon',
        'order_total_price'
      ])
    },
    data: function() {
      return {
        curStep: 0,

        // 子组件需要用的计划、场馆等信息
        scheduleDetail: ''
      }
    },
    created: function() {
      // 直接访问的时候，取其step
      // /schedule/new_schedule/step2
      var path = this.$route.fullPath
      var lastStartIndex = path.lastIndexOf('step')
      if (lastStartIndex < 0) this.curStep = 0
      else this.curStep = parseInt(path.substring(lastStartIndex + 4)) - 1

      // 取数据
      this.fetchData()
      console.log(this.scheduleDetail)
    },
    methods: {
      fetchData() {
        new Promise((resolve, reject) => {
          getSchedule(this.$route.query.scheduleId).then(response => {
            if (response.state === 'OK') {
              this.scheduleDetail = JSON.parse(response.object)
              resolve()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
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
      handleOrder: function() {
        new Promise((resolve, reject) => {
          saveOrder(this.token, this.$route.query.scheduleId, this.order_type, this.order_num, this.order_seat_name, this.order_price,
            this.choose_seats, this.choose_seats_count, this.order_did_use_coupon, this.order_used_coupon, this.order_total_price).then(response => {
            if (response.state === 'OK') {
              Message({
                message: '您已成功下达订单！',
                type: 'success',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })

              this.curStep++
              this.$router.push({
                path: '/order/new_order/step3',
                query: {
                  scheduleId: this.$route.query.scheduleId
                }
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
      handleNextStep: function() {
        this.curStep++
        this.$router.push({
          path: '/order/new_order/step2',
          query: {
            scheduleId: this.$route.query.scheduleId
          }
        })
        $('html,body').animate({ scrollTop: 0 }, 500)
      },
      handlePay: function() {
        // new Promise((resolve, reject) => {
        //   saveOrder(this.token, this.order_type, this.order_num, this.order_seat_name, this.order_price,
        //     this.choose_seats, this.choose_seats_count).then(response => {
        //     console.log(response)
        //     if (response.state === 'OK') {
        //       this.curStep++
        //       this.$store.dispatch('ResetSchedule', this.seatPriceMap).then(() => {
        //       }).catch(() => {
        //       })
        //     }
        //     resolve()
        //   }).catch(error => {
        //     reject(error)
        //   })
        // }).then(() => {
        // }).catch(() => {
        // })
      }
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
