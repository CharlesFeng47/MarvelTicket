<template>
  <div class="order-block">
    <div class="order-top">
      <el-row>
        <el-col :span="6">
          <span class="order-id">订单号：</span>
          <span>{{ order.orderID }}</span>
        </el-col>
        <el-col :span="5" :offset="2">
          <span class="order-state">{{ order.orderState }}</span>
        </el-col>
        <el-col :span="5" :offset="6">
          <span class="order-time">{{ order.orderTime }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="order-detail">
      <el-row>
        <el-col :span="14">
          <div class="order-plan">
            <el-row>
              <el-col :span="6">
                <div class="plan-img">
                  <a :href="toDetail" target="_blank">
                    <img :src="order.imagesUrl" alt="项目海报">
                  </a>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="plan-info">
                  <p class="plan-name">{{ order.programName }}</p>
                  <p class="plan-time">时间：<span>{{ order.programTime }}</span></p>
                  <p class="plan-spot">场馆：<span>{{ order.venueName }}</span></p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="order-consume">
            <p>票数：<span>{{ order.num }}</span>张</p>
            <p>共计：¥<span>{{ order.totalPrice }}</span>元</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="order-operate" style="width: 173px;">
            <template v-if="order.orderState === '未支付'">
              <template v-if="!overdue">
                <p style="margin-top:34px;margin-bottom: 4px" v-if="!overdue">剩余支付时间:
                  <br/><span style="color:red">{{ minute }}</span>分<span  style="color:red">{{ second }}</span>秒
                </p>
                <div class="pay-button" @click="goToPay" >立即支付</div>
                <div class="cancel-button" @click="cancelOrder">取消订单</div>
              </template>
              <template v-else>
                <p style="margin-top:60px;margin-bottom: 10px">
                  订单超时
                </p>
                <div class="pay-button" @click="buyAgain">重新购买</div>
              </template>
            </template>
            <template v-else-if="order.orderState === '已支付'">
              <template v-if="overtime">
                <div style="margin-top: 70px">节目过期</div>
              </template>
              <template v-else>
                <div style="margin-top: 70px" class="cancel-button" @click="unsubscribeOrder">取消订单</div>
              </template>
            </template>
            <template v-else>
              <template v-if="overtime">
                <div style="margin-top: 70px">节目过期</div>
              </template>
              <template v-else>
                <div style="margin-top: 70px" class="pay-button" @click="buyAgain">重新购买</div>
              </template>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { cancelOrder, unsubscribeOrder } from '../../../api/order'
  import { mapGetters } from 'vuex'
  export default {
    name: 'MyOrder',
    props: [
      'order'
    ],
    data() {
      return {
        // 订单是否超过支付时间
        overdue: false,
        second: 0,
        minute: 0,
        left_second: 0,
        interval: -1,
        // 节目的时间是否过时
        overtime: false,
        // 保存跳转到详情界面的url
        toDetail: ''
      }
    },
    watch: {
      order: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            // 定时器，计算剩余时间
            this.startClock()
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      type: function() {
        if (this.$route.query.type <= 4 && this.$route.query.type >= 0) {
          return this.$route.query.type
        } else {
          return '0'
        }
      }
    },
    mounted: function() {
      this.startClock()
    },
    methods: {
      startClock() {
        var programTime = new Date(this.order.programTime)
        if ((programTime.getTime() - new Date().getTime()) / 1000 < 900) {
          this.overtime = true
        } else {
          this.overtime = false
        }
        this.toDetail = '/detail/' + this.order.programID
        var date = this.order.orderTime
        if (this.interval !== -1) {
          window.clearInterval(this.interval)
        }
        var order_time = new Date(date)
        // 定时器，计算剩余时间
        var passed_second = (new Date().getTime() - order_time.getTime()) / 1000
        this.left_second = 900 - Math.round(passed_second)
        this.handleTime()
        this.interval = setInterval(this.handleTime, 1000)
      },
      handleTime() {
        if (this.left_second <= 0) {
          this.overdue = true
        } else {
          this.overdue = false
          this.minute = Math.floor(this.left_second / 60)
          this.second = this.left_second % 60
          this.left_second--
        }
      },
      cancelOrder() {
        new Promise((resolve, reject) => {
          cancelOrder(this.order.orderID, this.token).then(response => {
            if (response.state === 'OK') {
              location.reload()
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      unsubscribeOrder() {
        new Promise((resolve, reject) => {
          unsubscribeOrder(this.order.orderID, this.token).then(response => {
            if (response.state === 'OK') {
              location.reload()
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      buyAgain() {
        this.$router.push(this.toDetail)
      },
      goToPay() {
        window.open('/pay?orderid=' + this.order.orderID)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .order-block {
    margin: 20px 20px 0px 20px;
    border: 1px solid #EFEFEF;
    border-radius: 3px;
    .order-top {
      height: 30px;
      background-color: #F78989;
      padding-left: 10px;
      line-height: 30px;
    }
    .order-detail {
      padding: 20px;
      max-height: 200px;
      .order-plan {
        img {
          width: 95%;
          height: 160px;
        }
        .plan-info {
          /*float: left;*/
          width: 90%;
          padding-left: 10px;
          height: 160px;
          position: relative;
          .plan-name {
            margin: 4px 0;

          }
          .plan-spot {
            bottom: 5px;
            margin-bottom: 0px;
            position: absolute;
          }
          .plan-time {
            bottom: 30px;
            margin-bottom: 0px;
            position: absolute;
          }
        }
      }
      .order-consume {
        text-align: center;
        p {
          margin: 0;
          line-height: 40px;
        }
        padding-top: 35px;
        height: 160px;
        border-left: 1px #CACACA solid;
        border-right: 1px #CACACA solid;
      }
      .order-operate {
        text-align: center;
        .pay-button {
          width: 77px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          background-color: #F56C6C;
          color: #FFF;
          border-radius: 3px;
          cursor: pointer;
          margin: 0 auto 5px;
        }
        .pay-button:hover {
          background-color: #F78978;
        }
        .cancel-button:hover {
          color: #F56C6C;
          cursor: pointer;
        }
      }
    }
  }
</style>
