<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-row>
        <div align="center" style="margin-top: 20px">
          <img src="../../assets/step2.png" style="width: 598px !important;"/>
        </div>
      </el-row>
      <div class="top">Marvel Ticket
      </div>
      <el-container class="confirm-body">
        <el-aside width="200px" class="aside">
          <!-- todo href -->
          <!-- todo src -->
          <a @click="$router.go(-1)" target="_blank"><img
            :src="order_detail.posterSrc" :alt="order_detail.programName"></a>
        </el-aside>
        <el-container>
          <el-header style="margin-left: 30px; height: 23px;">
            <h2 style="color: #323232; margin: 0; line-height: 100%">{{ order_detail.programName }}</h2>
          </el-header>
          <el-main class="confirm-main">
            <el-row>
              <el-col :span="12">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="5" class="label-text">票面：</el-col>
                  <el-col :span="19">{{ order_detail.par.basePrice }} 元</el-col>
                </el-row>
                <el-row class="text-item address">
                  <el-col :span="5" class="label-text">地点：</el-col>
                  <el-col :span="19">{{ order_detail.address }}</el-col>
                </el-row>
                <el-row class="text-item">
                  <el-col :span="5" class="label-text">时间：</el-col>
                  <el-col :span="19">{{ order_detail.programTime }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="6" :offset="3" style="margin-top: 37px">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="13" class="label-text">数量：</el-col>
                  <el-col :span="11">&nbsp;&nbsp;{{ order_detail.buyNum }}&nbsp;&nbsp;张</el-col>
                </el-row>
                <el-row class="text-item" style="margin-top: 8%" type="flex" align="bottom">
                  <el-col :span="13" class="label-text">订单总额：</el-col>
                  <el-col :span="11" class="total-money">￥{{ order_detail.price }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
          <el-footer style="height: 44px">
            <el-row>
              <el-col :span="22" :offset="1">
                <el-button type="danger" @click="pay()" class="pay-btn">
                  小计：￥{{ order_detail.price }} 去结算
                </el-button>
              </el-col>
            </el-row>
          </el-footer>
        </el-container>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
  import { generateOrder } from '../../api/order'
  import { mapGetters } from 'vuex'
  export default {
    name: 'OrderConfirm',
    data: function() {
      return {
      }
    },

    computed: {
      ...mapGetters([
        'token'
      ]),
      // 通过存到localStorage 解决vuex 刷新之后失效的问题
      order_detail: function() {
        return JSON.parse(window.localStorage.getItem('order_detail'))
      }
    },
    methods: {
      pay: function() {
        new Promise((resolve, reject) => {
          generateOrder(this.order_detail.id, this.order_detail.seatType, this.order_detail.curField, this.order_detail.buyNum, this.token).then(orderid => {
            this.$router.push('/pay?orderid=' + orderid)
            resolve()
          }).catch(error => {
          })
        }).then(() => {
        })
      }
    }
  }
</script>

<style scoped>

  .confirm-body {
    font-size: 16px;
    color: #323232;
    /*margin-top: 4%;*/
    overflow: hidden;
    border: 3px solid #eee;
    border-top: 0px;
    padding: 25px;
  }
  .top{
    margin-top: 34px;
    padding-left: 22px;
    /*border-bottom: 1px solid #e5e5e5;*/
    /*border-left: 3px solid #FF5219;*/
    border-radius: 2px;
    height: 48px;
    background-color: #FD6857;
    line-height: 48px;
    font-size: 22px;
    color: #FFFFFF;
    width: 100%;
  }
  img {
    border: none;
    outline-style: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .confirm-main {
    margin-left: 33px;
  }

  .text-item {
    margin-top: 8%;
  }

  .label-text {
    text-align: right;
  }

  .address {
    line-height: 25px;
  }

  .total-money {
    color: #fe6f61;
    font-size: 38px;
    height: 38px
  }

  .pay-btn {
    /*background-color: #fd6857;*/
    /*border: none;*/
    width: 100%;
    height: 44px;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
    /*color: #ffffff;*/
  }
  .aside{
    overflow: hidden;
  }
</style>
