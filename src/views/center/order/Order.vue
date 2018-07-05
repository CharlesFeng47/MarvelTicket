<template>
  <div class="order-block">
    <div class="order-top">
      <el-row>
        <el-col :span="3" style="padding-left: 10px; font-size: 14px">
          <strong class="order-time">{{ date }}</strong>
        </el-col>
        <el-col :span="7" style="font-size: 13px">
          <span class="order-id">订单号：</span>
          <span>{{ order.orderID }}</span>
        </el-col>
        <el-col :span="2" :offset="10">
          <div style="margin-left: 12px">
            <span class="order-state">{{ order.orderState }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="order-detail">
      <el-row>
        <el-col :span="14">
          <div class="order-plan">
            <el-row>
              <el-col :span="5">
                <div class="plan-img">
                  <a :href="toDetail" target="_blank">
                    <img :src="order.imagesUrl" alt="项目海报">
                  </a>
                </div>
              </el-col>
              <el-col :span="19">
                <div class="plan-info">
                  <p class="plan-name">{{ order.programName }}</p>
                  <p class="plan-time">时间：<span>{{ order.programTime.slice(0,-3) }}</span></p>
                  <p class="plan-spot">场馆：
                    <span>
                      <el-popover
                        placement="right-start"
                        trigger="hover">
                        <div>
                          {{ order.venueAddress }}
                        </div>
                        <span slot="reference" class="venue-name">{{ order.venueName }} <i class="el-icon-view" style="color:#F56C6C"></i></span>
                      </el-popover>
                    </span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="order-consume" v-if="order.num !== 0">
            <p class="ticket-num">
              <el-popover
                placement="right-start"
                trigger="hover">
                <div v-for="seat in seatInfo">
                  {{ seat }}
                </div>
                <span slot="reference" class="ticket-num">票数：<span>{{ order.num }}</span>张 <i class="el-icon-view" style="color:#F56C6C"></i></span>
              </el-popover>
            </p>
            <p>共计：¥<span>{{ order.totalPrice }}</span>元</p>
          </div>
          <div class="order-consume" v-else>
            <p style="margin-top: 23px">共计：¥<span>{{ order.totalPrice }}</span>元</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="order-operate" style="width: 173px;">
            <template v-if="order.orderState === '未支付'">
              <template v-if="!overdue">
                <p style="margin-top:34px;margin-bottom: 4px" v-if="!overdue">剩余支付时间:
                  <br/><span style="color:red">{{ minute }}</span>分<span style="color:red">{{ second }}</span>秒
                </p>
                <div class="pay-button" @click="goToPay">立即支付</div>
                <div class="cancel-button">
                  <el-popover
                    placement="right-start"
                    width="160">
                    <div style="text-align: center;padding: 10px 0 10px">
                      <div style="margin-bottom: 7px"><i class="el-icon-warning" style="color:#F56c6c"/> 确认取消订单？</div>
                      <el-button type="danger" size="mini" @click="cancelOrder">确定</el-button>
                    </div>
                    <span  slot="reference">取消订单</span>
                  </el-popover>
                </div>
                <!--<div class="cancel-button" @click="cancelOrder">取消订单</div>-->
              </template>
              <template v-else>
                <p style="margin-top:46px;margin-bottom: 10px">
                  订单超时
                </p>
                <div class="pay-button" @click="buyAgain">重新购买</div>
              </template>
            </template>
            <template v-else-if="order.orderState === '已支付'">
              <template v-if="overtime">
                <div style="margin-top: 70px">订单生效</div>
              </template>
              <template v-else>
                <div class="cancel-button" style="margin-top: 65px">
                  <el-popover
                    placement="right-start"
                    width="160">
                    <div style="text-align: center;padding: 10px 0 10px">
                      <div style="margin-bottom: 7px"><i class="el-icon-warning" style="color:#F56c6c"/> 确认取消订单？</div>
                      <el-button type="danger" size="mini" @click="unsubscribeOrder">确定</el-button>
                    </div>
                    <span  slot="reference">取消订单</span>
                  </el-popover>
                </div>
              </template>
            </template>
            <template v-else>
              <template v-if="overtime">
                <div style="margin-top: 70px">节目过期</div>
              </template>
              <template v-else>
                <div style="margin-top: 64px" class="pay-button" @click="buyAgain">重新购买</div>
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
    components: {},
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
        toDetail: '',
        // 订单生成日期
        date: '',
        isPositive: false,
        seatInfo: []
      }
    },
    watch: {
      order: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            // 定时器，计算剩余时间
            console.log(newVal)
            this.init()
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
      this.init()
    },
    methods: {
      init() {
        // 设置座位信息
        this.seatInfo = []
        for (var key in this.order.ticketInfo) {
          this.seatInfo.push(key)
        }
        // 设置标题颜色
        this.isPositive = (this.order.orderState === '已支付')
        // 设置节目时间
        this.date = this.order.programTime.split(' ')[0]
        var programTime = new Date(this.order.programTime)
        // 判断是否超时
        if ((programTime.getTime() - new Date().getTime()) / 1000 < 900) {
          this.overtime = true
        } else {
          this.overtime = false
        }
        this.toDetail = '/detail/' + this.order.programID
        // 定时器
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
          cancelOrder(this.order.orderID, this.token).then(() => {
            location.reload()
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
          unsubscribeOrder(this.order.orderID, this.token).then(() => {
            location.reload()
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
  .order-block:hover {
    box-shadow: 2px 2px 1px #E1E5E7;
  }

  .order-block {
    margin: 20px 20px 0px 20px;
    border: 1px solid #F1F1F1;
    border-radius: 3px;
    .order-top {
      height: 30px;
      background-color: #F56C6C;
      padding-left: 10px;
      line-height: 30px;
      color: ghostwhite;
    }
    .order-detail {
      padding: 20px;
      max-height: 180px;
      .order-plan {
        font-size: 14px;
        img {
          width: 98%;
          height: 140px;
        }
        .plan-info {
          /*float: left;*/
          width: 90%;
          padding: 10px 10px 10px;
          height: 140px;
          position: relative;
          .plan-name {
            margin: 4px 0;
            /*word-break:keep-all;*/
          }
          .plan-spot {
            bottom: 5px;
            margin-bottom: 0px;
            position: absolute;
            .venue-name:hover {
              cursor: pointer;
            }
          }
          .plan-time {
            bottom: 30px;
            margin-bottom: 0;
            position: absolute;
          }
        }
      }
      .order-consume {
        text-align: left;
        padding-left: 21%;
        padding-top: 35px;
        height: 140px;
        border-left: 1px #CACACA solid;
        border-right: 1px #CACACA solid;
        p {
          margin: 0;
          line-height: 40px;
        }
        .ticket-num:hover {
          cursor: pointer;
        }
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
