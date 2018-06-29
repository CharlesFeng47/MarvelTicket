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
        time: 3,
        interval: -1
      }
    },
    mounted: function() {
      this.initClock()
    },
    computed: {
      orderid: function() {
        return this.$route.query.orderid
      }
    },
    watch: {
      orderid: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            this.initClock()
          }
        }
      }
    },
    methods: {
      initClock() {
        this.time = 3
        if (this.interval !== -1) {
          window.clearInterval(this.interval)
        }
        this.interval = setInterval(this.handle_time, 1000)
      },
      jumpToOrder() {
        this.$router.push('/center/manage/order?type=0')
      },
      handle_time() {
        if (this.time === 1) {
          this.jumpToOrder()
          window.clearInterval(this.interval)
        }
        this.time--
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
