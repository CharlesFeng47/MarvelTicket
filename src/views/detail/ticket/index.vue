<template>
  <div class="detail-container">
    <div class="poster">
      <img :src="programDetail.posterSrc">
      <div class="count">
        <i class="el-icon-view"></i>{{ programDetail.viewNum }}人浏览
        <span id="myLike" :class="{ hasStar: this.programDetail.star }" @click="changeStar()"><i class="el-icon-star-on"></i><span id="favourNum">{{ programDetail.favoriteNum }}</span>人想看</span>
      </div>
    </div>
    <div class="detail">
      <div class="show-title">
        {{ programDetail.title }}
      </div>
      <div class="show-info">
        <i class="el-icon-time"/><span>{{ programDetail.time }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <i class="el-icon-location-outline"/>

        <!--TODO gy 加了effect="light"之后，底色也被渲染为橘色，你看看吧。。-->
        <el-tooltip :content="programDetail.address" placement="right" effect="light">
        <!--<el-tooltip :content="programDetail.address" placement="right">-->
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
                <el-radio v-if="par.comments===''" v-model="curParPrice" :label="par.basePrice" border size="medium">{{ par.basePrice }}</el-radio>
                <el-radio v-if="par.comments!==''" v-model="curParPrice" :label="par.basePrice" border size="medium">{{ par.basePrice }} | {{ par.comments }}</el-radio>
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
          <a href="/orderConfirm">
            <button class="buy-ticket" @click="buyTicket">立即购票</button>
          </a>
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
        // 当前选定的场次和票面
        curField: '',
        curParPrice: 0,
        buyNum: 1
        // star: this.programDetail.star
      }
    },
    computed: {
      price: function() {
        // console.log(this.programDetail)
        return this.curParPrice * this.buyNum
      }
    },
    // watch: {
    //   'this.programDetail.star': {
    //     handler: function(newVal, oldVal) {
    //       this.star = newVal
    //     }
    //   }
    // },
    methods: {
      changeStar() {
        this.$emit('changeStar')
      },
      // 从当前节目的场次和票面中选择第一个作为默认显示，当父组件加载完数据后调用此方法
      initDefaultFieldAndParAndBuyNum(fields, pars) {
        this.curField = fields[0]
        this.curParPrice = pars[0].basePrice
        this.buyNum = 1
      },

      add: function(event) {
        if (this.buyNum++ === 6) {
          this.buyNum = 6
          this.$message('购买的票数不能大于5张')
        }
      },
      reduce: function(event) {
        if (this.buyNum-- === 1) {
          this.buyNum = 1
        }
      },
      buyTicket: function(event) {

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
      .hasStar{
        color: #FF5161;
      }
      #myLike:hover{
        cursor: pointer;
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
