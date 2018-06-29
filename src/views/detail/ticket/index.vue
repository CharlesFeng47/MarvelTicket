<template>
  <div class="detail-container">
    <div class="poster">
      <img :src="programDetail.posterSrc">
      <div class="count">
        <i class="el-icon-view"></i> {{ programDetail.viewNum }}人浏览
      </div>
      <div class="count want"  @click="changeStar()">
        <!--class like 用于添加动画-->
        <span v-if="this.programDetail.star" class="like">
          <svg-icon icon-class="heart" style="color: #FF5161;"/>
        </span>
        <span v-else class="not-like">
                 <svg-icon icon-class="heart2"/>
        </span>
        <span id="is_like" :class="{ hasStar: this.programDetail.star }">
          <span id="favourNum"> {{ programDetail.favoriteNum }}</span>人想看</span>
      </div>
    </div>
    <div class="detail">
      <div class="show-title">
        {{ programDetail.title }}
      </div>
      <div class="show-info">
        <i class="el-icon-time"/><span>{{ programDetail.time }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <i class="el-icon-location-outline"/>
        <el-tooltip :content="programDetail.address" placement="right" effect="light">
          <span>{{ programDetail.spot }}</span>
        </el-tooltip>
      </div>

      <div class="ticket-info">
        <el-row>
          <el-col :span="3">
            <p>选择场次</p>
          </el-col>
          <el-col :span="20" class="time-list">
            <div>
              <template v-for="field in programDetail.fields">
                <el-radio v-model="curField" :label="field" border size="medium">{{ field }}</el-radio>
              </template>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <p>选择价位</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <div>
              <template v-for="par in programDetail.pars">
                <el-radio v-if="par.comments===''" v-model="curSeatType" :label="par.seatType" border size="medium">{{ par.basePrice }}</el-radio>
                <el-radio v-if="par.comments!==''" v-model="curSeatType" :label="par.seatType" border size="medium">{{ par.basePrice }} | {{ par.comments }}</el-radio>
              </template>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <p>选择数量</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <div class="number-input-wrapper">
              <span v-show="buyNum===1">-</span>
              <span v-show="buyNum!==1" style="color: #F78978" @click="reduce">-</span>
              <input v-model="buyNum" class="buy-num" readonly>
              <span v-show="buyNum===6" style="padding-top: 1px">+</span>
              <span v-show="buyNum!==6" style="color: #F78978;padding-top: 1px" @click="add">+</span>
            </div>
            <div v-show="buyNum===6" style="color: red;font-size: 12px;margin-top: -28px;margin-left: 120px">
              一次最多只能购买6张
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <p>合计</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <p class="money" style="margin-top: 4px">
              <span class="order-price">{{ price }}</span>
              <span class="unit">元</span>
            </p>
          </el-col>
        </el-row>
        <div class="list-box">
          <!--<a href="/orderConfirm">-->
          <button class="buy-ticket" @click="generateOrder({seatType: curSeatType, buyNum, curField, price})">立即购票</button>
          <!--</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    props: [
      'programDetail'
    ],
    data() {
      return {
        // 购买数量
        buyNum: 1,

        // 当前选定的场次、票面、座位类型
        curField: '',
        curParPrice: 0,
        curSeatType: ''
      }
    },
    computed: {
      price: function() {
        // console.log(this.programDetail)
        return this.curParPrice * this.buyNum
      }
    },
    watch: {
      curSeatType: {
        handler: function(newVal, oldVal) {
          console.log(this.programDetail)
          for (var i in this.programDetail.pars) {
            if (this.programDetail.pars[i].seatType === newVal) {
              this.curParPrice = this.programDetail.pars[i].basePrice
            }
          }
        }
      }
    },
    methods: {
      changeStar() {
        this.$emit('changeStar')
      },
      // 从当前节目的场次和票面中选择第一个作为默认显示，当父组件加载完数据后调用此方法
      initDefaultFieldAndParAndBuyNum(fields, pars) {
        this.curField = fields[0]
        this.curParPrice = pars[0].basePrice
        this.curSeatType = pars[0].seatType
        this.buyNum = 1
      },

      // 修改购买数量
      add: function() {
        if (this.buyNum++ === 6) {
          this.buyNum = 6
          this.$message('购买的票数不能大于5张')
        }
      },
      reduce: function() {
        if (this.buyNum-- === 1) {
          this.buyNum = 1
        }
      },

      // 生成订单之前的信息，保存在 vuex 中
      generateOrder(order) {
        order.id = this.programDetail.id
        order.programName = this.programDetail.title
        order.typeEnum = this.programDetail.typeEnum
        order.posterSrc = this.programDetail.posterSrc
        order.programTime = this.programDetail.time
        order.spot = this.programDetail.spot
        order.address = this.programDetail.address
        // this.programDetail.fields = detail.fields
        for (var i in this.programDetail.pars) {
          console.log(this.programDetail.pars[i])
          if (this.programDetail.pars[i].seatType === order.seatType) {
            order.par = this.programDetail.pars[i]
          }
        }

        // 将order信息保存到store
        console.log(order)
        this.$store.dispatch('StoreOrderDetail', {
          order_detail: order
        }).then(() => {
          // 购票弹窗到另一窗口
          window.open('/orderConfirm')
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color:#f7f7f7;
  .detail-container{
    margin: 3% auto;
    width: 94%;
    display: table;
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 #eee;
    border: 1px solid #eee;
    .poster {
      float: left;
      width: 24%;
      height: 360px;
      margin-top: -3%;
      margin-left: -3%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 18px;
        background-color: #fff;
        box-shadow: 0 4px 16px 0 #ccc;
      }
      .count {
        line-height: 24px;
        color: #777;
        font-size: 14px;
        margin-top: 6px;
        position: relative;
        text-align: center;
      }
      .want:hover{
        color: #FF5161;
        cursor: pointer;

      }
      .hasStar{
        color: #FF5161;
      }

      @-webkit-keyframes turnLike
      {
        0%   {font-size: 14px}
        25%  {font-size: 18px;}
        50%  {font-size: 19px;}
        100% {font-size: 14px;}
      }
      .like{
        -webkit-animation: turnLike 2s
      }

      @-webkit-keyframes turnDislike
      {
        0%   {font-size: 14px}
        25%  {font-size: 12px;}
        50%  {font-size: 10px;}
        100% {font-size: 14px;}
      }

      .not-like{
        -webkit-animation: turnDislike 2s
      }

    }
    .detail{
      width:76%;
      padding: 30px;
      float: left;
      .el-row{
        margin-bottom: 10px;
      }
      .show-title{
        font-size: 24px;
        font-weight: 500;
        color: #331612;
        line-height: 40px;
      }
      .show-info{
        margin-left: 10px;
        margin-top: 20px;
        color:#F78989;
      }
      .ticket-info{
        margin-left: 10px;
        margin-top: 10px;
        p{

        }
        /*.time-list{*/
          .el-radio {
            margin-top: 7px;
            margin-left: 0px;
            border-radius:20px;
            border: 2px solid $border-color;
            .el-radio__input {
              display: none;
            }
          }
          .is-checked {
            border: 2px #FD6857 solid;
          }
          .el-radio__input.is-checked+.el-radio__label {
            color: #FD6857;
          }
        .number-input-wrapper {
          margin-top: 7px;
          width: 116px;
          height: 36px;
          line-height: 34px;
          border-radius: 100px;
          border: solid 2px $border-color;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
          display: inline-block;

          span {
            float: left;
            width: 38px;
            height: 30px;
            margin-top: -1px;
            color: #ccc;
            font-size: 30px;
            text-align: center;
            cursor: pointer;
          }
          input {
            float: left;
            width: 34px;
            font-size: 15px;
            text-align: center;
            display: inline-block;
            height: 30px;
            color: #ff6a69;
            border: none;
            padding: 0;
            margin-top: 1px;
            outline-style: none;
          }
        }
        .order-price{
          font-size: 30px;
          color:red;
          font-weight: 300;
        }
      }
    }
  }
  .buy-ticket{
    margin-bottom: 20px;
    width: 168px;
    line-height: 44px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    cursor: pointer;
    height: 44px;
    border-radius: 44px;
    background-image: linear-gradient(to bottom,#ff785b,#ff3869);
    box-shadow: 0 4px 9px 0 #fbc1ba;
    border: none;
    padding: 0;
    outline-style: none;
  }
</style>
