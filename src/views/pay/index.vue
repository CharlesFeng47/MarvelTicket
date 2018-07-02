<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3" style="margin-bottom: 40px">
        <el-row>
          <div align="center" style="margin-top: 20px">
            <img src="../../assets/step3.png" width="600"/>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p v-show="overdue" class="pay-time">订单超时</p>
            <p v-show="!overdue" class="pay-time">您的订单即将取消，请在 <span>{{ minute }}</span>分<span>{{ second }}</span>秒
              内完成支付</p>
          </el-col>
        </el-row>
        <el-row justify="space-between" type="flex" style="margin-top: 10px">
          <el-col :span="12">
            <div class="new-order">
              <div class="pay-top">商品详情</div>
              <div class="order-detail">
                <el-row>
                  <el-col :span="span">
                    <p>订单编号：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.orderID }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>下单时间：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.orderTime }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出名称：</p>
                  </el-col>
                  <el-col :span="19">
                    <p>{{ order.programName }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出时间：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.programTime }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出地点：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>
                      <MyMap :address="order.venueAddress" :spotName="order.venueName" :big=false></MyMap>
                    </p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>订单清单：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>
                      <el-popover
                        placement="right-start"
                        trigger="hover">
                        <div v-for="seat in seatInfo">
                          {{ seat }}
                        </div>
                        <span slot="reference" class="venue-name">{{ order.num}}张 | 共{{ order.totalPrice }}元</span>
                      </el-popover>

                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="new-order">
              <div class="pay-top">支付方式</div>
              <el-row class="radio">
                <el-radio v-model="pay_mode" label="1" border><img src="../../assets/1.png" height="30"
                                                                   width="96"/></el-radio>
              </el-row>
              <el-row class="radio" style="margin-top: 40px">
                <el-radio v-model="pay_mode" label="2" border><img src="../../assets/2.png" height="30"
                                                                   width="96"/></el-radio>
              </el-row>
              <div class="pay-bottom">
                <el-row>
                  <el-col :span="4" :offset="7">
                    <div style="color: red">￥ <span>{{ order.totalPrice }}</span></div>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" @click="surePay" :disabled="overdue">确认支付</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { getOrder, payOrder } from '../../api/order'
  import { mapGetters } from 'vuex'
  import MyMap from '../map/index'

  export default {
    name: 'pay',
    components: {
      MyMap
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      orderid: function() {
        return this.$route.query.orderid
      }
    },
    watch: {
      orderid: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            this.initOrder()
          }
        }
      }
    },
    data() {
      return {
        pay_mode: '1',
        span: 5,
        order: {},
        overdue: false,
        second: 0,
        minute: 0,
        left_second: 0,
        interval: -1,
        // 保存座位信息
        seatInfo: []
      }
    },
    mounted: function() {
      this.initOrder()
    },
    methods: {
      initOrder() {
        new Promise((resolve, reject) => {
          getOrder(this.orderid, this.token).then(order => {
            this.order = order
            console.log(this.order)
            this.startClock(this.order.orderTime)
            this.seatInfo = []
            for (var key in this.order.ticketInfo) {
              this.seatInfo.push(key)
            }
            resolve()
          }).catch(error => {
          })
        }).then(() => {
        })
      },
      surePay() {
        new Promise((resolve, reject) => {
          payOrder(this.orderid, this.token).then(paySuccess => {
            this.$router.push('/paySuccess?orderid=' + this.orderid)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      startClock(date) {
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
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .pay-time {
    height: 57px;
    line-height: 57px;
    padding: 0 27px;
    font-size: 17px;
    color: #2D3E4F;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    span {
      color: red;
    }
  }

  .order-detail {
    padding: 10px 27px;
    font-size: 15px;
    color: #2D3E4F;
  }

  .new-order {
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    height: 350px;
    p {
      vertical-align: middle;
      overflow: hidden;
      max-lines: 2;
      height: 33px;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin: 8px 0 8px;
    }
    .venue-name:hover{
      cursor: pointer;
    }
    .radio {
      margin: 65px 37% 10px;
      .el-radio.is-bordered {
        padding: 5px 20px 0 10px;
        border-radius: 4px;
        border: 2px solid #f1f1f1;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 40px;
      }
      .el-radio {
        color: #606266;
        font-weight: 500;
        line-height: 1;
        cursor: pointer;
        white-space: nowrap;
        outline: 0;
      }
      .el-radio.is-bordered.is-checked {
        border-color: #F78978;
      }
      .el-radio__inner {
        display: none;
      }
    }
  }

  .pay-top {
    padding-left: 22px;
    /*border-bottom: 1px solid #e5e5e5;*/
    /*border-left: 3px solid #FF5219;*/
    border-radius: 3px;
    height: 48px;
    background-color: #F56C6C;
    line-height: 48px;
    font-size: 22px;
    color: #FFFFFF;
    width: 100%;
  }

  .pay-bottom {
    margin-top: 65px;
    height: 48px;
    line-height: 48px;
    background-color: #fafafa;
    font-size: 19px;
    padding-left: 22px;
    border-top: 1px solid #e5e5e5;
    border-radius: 3px;
  }
</style>
