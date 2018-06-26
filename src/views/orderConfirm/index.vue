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
          <a href="#" target="_blank"><img
            src="../../../src/assets/order_demo.png" alt="【上海站】音乐剧《复活吧！胡萝卜》"></a>
        </el-aside>
        <el-container>
          <el-header style="margin-left: 30px; height: 23px;">
            <h2 style="color: #323232; margin: 0; line-height: 100%">{{ orderDetail.title }}</h2>
          </el-header>
          <el-main class="confirm-main">
            <el-row>
              <el-col :span="12">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="5" class="label-text">票面：</el-col>
                  <el-col :span="19">{{ orderDetail.par }} 元</el-col>
                </el-row>
                <el-row class="text-item address">
                  <el-col :span="5" class="label-text">地点：</el-col>
                  <el-col :span="19">{{ orderDetail.address }}</el-col>
                </el-row>
                <el-row class="text-item">
                  <el-col :span="5" class="label-text">时间：</el-col>
                  <el-col :span="19">{{ orderDetail.time }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="6" :offset="3" style="margin-top: 37px">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="13" class="label-text">数量：</el-col>
                  <el-col :span="11">&nbsp;&nbsp;{{ orderDetail.number }}&nbsp;&nbsp;张</el-col>
                </el-row>
                <el-row class="text-item" style="margin-top: 8%" type="flex" align="bottom">
                  <el-col :span="13" class="label-text">订单总额：</el-col>
                  <el-col :span="11" class="total-money">￥{{ orderDetail.totalPrice }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
          <el-footer style="height: 44px">
            <el-row>
              <el-col :span="22" :offset="1">
                <el-button type="danger" @click="pay()" class="pay-btn">
                  小计：￥{{ orderDetail.totalPrice }} 去结算
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
  export default {
    name: 'OrderConfirm',
    data: function() {
      return {
        orderDetail: {
          title: '【上海站】音乐剧《复活吧！胡萝卜》',
          par: 160,
          address: '白玉兰剧场--上海市卢湾区重庆南路308号 卢湾文化馆内（近建国中路）',
          time: '2018-09-06 星期四 19:30',
          number: 1,
          totalPrice: 86.00
        }
      }
    },
    methods: {
      pay: function() {
        this.$router.push('/pay')
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
