<template>
      <div class="order-block">
        <div class="order-top">
          <el-row>
            <el-col :span="6">
              <span class="order-id">订单号：</span>
              <span>{{ order.orderid }}</span>
            </el-col>
            <el-col :span="5" :offset="2">
              <span class="order-state">{{ order.state }}</span>
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
                <div class="plan-img">
                  <a href="/" target="_blank">
                    <img :src="order.posterSrc" alt="项目海报">
                  </a>
                </div>
                <div class="plan-info">
                  <p class="plan-name">{{ order.name }}</p>
                  <p class="plan-time">时间：<span>{{ order.planTime }}</span></p>
                  <p class="plan-spot">场馆：<span>{{ order.spot }}</span></p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="order-consume">
                <p>票数：<span>{{ order.orderNum }}</span>张</p>
                <p>共计：¥<span>{{ order.orderPrice }}</span>元</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="order-operate" style="width: 173px;">
                  <p style="margin-top:34px;margin-bottom: 4px">剩余支付时间:
                    <br/><i class="time-fen">08</i>分<i class="time-miao">48</i>秒
                  </p>
                  <div class="pay-button">立即支付</div>
                  <div class="cancel-button">取消订单</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'myorder',
    components: {
      ElRow
    },
    data() {
      return {

      }
    },
    props: [
      'order'
    ],
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .order-block {
    margin: 20px 20px 0px 20px;
    border: 1px solid #EFEFEF;
    border-radius: 3px;
    .order-top{
      height: 30px;
      background-color: #F78989;
      padding-left: 10px;
      line-height:30px;
    }
    .order-detail{
      padding: 20px;
      max-height: 200px;
      .order-plan{
        img{
          height: 160px;
        }
        .plan-info{
          float: left;
          padding-left: 10px;
          height: 160px;
          position:relative;
          .plan-name{
            margin: 4px 0;

          }
          .plan-spot{
            bottom: 5px;
            margin-bottom: 0px;
            position:absolute;
          }
          .plan-time{
            bottom: 30px;
            margin-bottom: 0px;
            position:absolute;
          }
        }
        .plan-img{
          float: left;
        }
      }
      .order-consume{
        text-align: center;
        p{
          margin: 0;
          line-height:40px;
        }
        padding-top: 35px;
        height: 160px;
        border-left: 1px #CACACA solid;
        border-right: 1px #CACACA solid;
      }
      .order-operate{
        text-align: center;
        .pay-button{
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
        .pay-button:hover{
          background-color: #F78978;
        }
        .cancel-button:hover{
          color: #F56C6C;
          cursor: pointer;
        }
      }
    }
  }
</style>
