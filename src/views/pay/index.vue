<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row>
          <div align="center" style="margin-top: 20px">
            <img src="../../assets/step3.png" width="600"/>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p v-show="overdue" class="pay-time">订单超时</p>
            <p v-show="!overdue" class="pay-time">您的订单即将取消，请在 <span v-bind="minute">{{ minute }}</span>分<span v-bind="second">{{ second }}</span>秒
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
                    <p>{{ order.order_id }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>下单时间：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_time }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出名称：</p>
                  </el-col>
                  <el-col :span="19">
                    <p>{{ order.order_program.name }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出时间：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_program.time }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>演出地点：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_program.venue }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="span">
                    <p>订单清单：</p>
                  </el-col>
                  <el-col :span="14">
                    <p>{{ order.order_num}}张 | 共{{ order.order_value }}元</p>
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
                    <div style="color: red">￥ <span>150</span></div>
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
  import { getOrder } from '../../api/order'
  export default {
    name: 'pay',
    components: {

    },
    computed: {
      orderid: function() {
        return this.$route.query.orderid
      }
    },
    data() {
      return {
        pay_mode: '1',
        span: 5,
        order: {
          order_id: '12345678',
          order_time: new Date(),
          order_value: 124,
          order_num: 2,
          order_program: {
            name: '小天鹅音乐节',
            time: '2018-07-15 15:00:00',
            venue: '南京博物館'
          }
        },
        overdue: false,
        second: 0,
        minute: 0
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getOrder(this.orderid).then(response => {
          if (response.state === 'OK') {
            console.log(response.object)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
      }).catch(() => {
      })
      this.order_time = new Date('2018/06/26 11:00:00')
      // 定时器，计算剩余时间
      var passed_second = (new Date().getTime() - this.order_time.getTime()) / 1000
      var left_second = 900 - Math.round(passed_second)
      var _this = this
      setInterval(handle_time, 1000)
      handle_time()
      function handle_time() {
        // alert(left_second)
        if (left_second <= 0) {
          _this.overdue = true
        } else {
          _this.overdue = false
          _this.minute = Math.floor(left_second / 60)
          _this.second = left_second % 60
          left_second--
        }
      }
    },
    methods: {
      surePay() {
        this.$router.push('/paySuccess')
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
    padding: 0 27px;
    font-size: 15px;
    color: #2D3E4F;
    /*border: 1px solid #e5e5e5;*/
    /*border: 1px solid #e5e5e5;*/
    /*border-radius: 3px;*/
  }

  .new-order {
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    height: 350px;
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
    background-color: #FD6857;
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
