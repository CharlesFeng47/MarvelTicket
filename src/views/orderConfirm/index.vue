<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-container class="confirm-body">
        <el-aside width="200px">
          <!-- todo href -->
          <!-- todo src -->
          <a href="#" target="_blank"><img
            src="../../../src/assets/order_demo.png" alt="【上海站】音乐剧《复活吧！胡萝卜》" width="200"
            height="282"></a>
        </el-aside>
        <el-container>
          <el-header style="margin-left: 30px; height: 23px;">
            <h2 style="color: #323232; margin: 0; line-height: 100%">【上海站】音乐剧《复活吧！胡萝卜》</h2>
          </el-header>
          <el-main class="confirm-main">
            <el-row>
              <el-col :span="9">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="5" class="label-text">票面：</el-col>
                  <el-col :span="19">160 元</el-col>
                </el-row>
                <el-row class="text-item address">
                  <el-col :span="5" class="label-text">地点：</el-col>
                  <el-col :span="19">白玉兰剧场--上海市卢湾区重庆南路308号 卢湾文化馆内（近建国中路）</el-col>
                </el-row>
                <el-row class="text-item">
                  <el-col :span="5" class="label-text">时间：</el-col>
                  <el-col :span="19">2018-09-06 星期四 19:30</el-col>
                </el-row>
              </el-col>
              <el-col :span="7" :offset="6">
                <el-row class="text-item" style="margin-top: 5%">
                  <el-col :span="13" class="label-text">数量：</el-col>
                  <el-col :span="11">&nbsp;&nbsp;1&nbsp;&nbsp;张</el-col>
                </el-row>
                <el-row class="text-item" style="margin-top: 8%" type="flex" align="bottom">
                  <el-col :span="13" class="label-text">订单总额：</el-col>
                  <el-col :span="11" class="total-money">￥86.00</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
          <el-footer>
            <el-row>
              <el-col :span="22" :offset="1" style="padding-left: 10px; margin-top: 6px">
                <el-button class="pay-btn">
                  小计：￥86.00 去结算
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
    name: 'OrderConfirm'
  }
</script>

<style scoped>

  .confirm-body {
    font-size: 16px;
    color: #323232;
    margin-top: 4%;
    overflow: hidden;
    border: 3px solid #eee;
    border-top: 50px solid #fe6f61;
    padding: 32px 20px 20px 20px;
  }

  img {
    border: none;
    outline-style: none;
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
    background-color: #fd6857;
    border: none;
    width: 100%;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
    color: #ffffff;
  }

</style>
