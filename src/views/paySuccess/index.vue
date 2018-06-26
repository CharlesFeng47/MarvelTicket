<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-row>
        <div align="center" style="margin-top: 20px">
          <img src="../../assets/step4.png" style="width: 598px !important;"/>
        </div>
      </el-row>
      <div class="top">支付成功
      </div>
      <el-container class="confirm-body">
        <div align="center" style="text-align: center;width: 100%">
          支付成功，正在为您跳转到订单详情！   <span style="color:red;">{{ time }} 秒</span>
        </div>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'PaySuccess',
    data: function() {
      return {
        time: 6
      }
    },
    mounted: function() {
      this.time = 6
      var _this = this
      var interval = setInterval(handle_time, 1000)
      handle_time()
      function handle_time() {
        // alert(left_second)
        if (_this.time === 0) {
          _this.jumpToOrder()
        }
        _this.time--
      }
    },
    methods: {
      jumpToOrder() {
        this.$router.push('/center/manage/order?type=0')
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
    text-align: center;
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
    /*border: none;*/
    /*outline-style: none;*/
    /*width: 100%;*/
    /*height: 100%;*/
  }

</style>
