<template>
  <div class="container">
    <div class="poster">
      <img class="" src="https://img1.tking.cn/assets/img/8t72PWJdHE.jpg" data-src="https://img1.tking.cn/assets/img/8t72PWJdHE.jpg" alt="【广州站】孟京辉戏剧作品《一个陌生女人的来信》">
        <div class="count">
          <i class="el-icon-view"></i>1480人浏览
          <i class="el-icon-star-on"></i><span id="favourNum">14</span>人想看
        </div>
    </div>
    <div class="detail" >
      <div class="show-title">
        【广州站】孟京辉戏剧作品《一个陌生女人的来信》
      </div>
      <div class="show-info">
        <i class="el-icon-time"/><span>2018.08.03-2018.08.05</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-location-outline"/><span>广州友谊剧院</span>
      </div>

      <div class="ticket-info">
        <el-row>
          <el-col :span="3">
            <p>选择场次</p>
          </el-col>
          <el-col :span="20" class="time-list">
            <div>
              <el-radio v-model="time" label="1" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
              <el-radio v-model="time" label="2" border size="medium">2018-08-03 星期五 20:00</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <p>选择价位</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <div>
              <el-radio v-model="price" label="1" border size="medium">100元</el-radio>
              <el-radio v-model="price" label="2" border size="medium">200元</el-radio>
              <el-radio v-model="price" label="3" border size="medium">300元</el-radio>
              <el-radio v-model="price" label="4" border size="medium">400元</el-radio>
              <el-radio v-model="price" label="5" border size="medium">500元</el-radio>
              <el-radio v-model="price" label="6" border size="medium">600元</el-radio>
              <el-radio v-model="price" label="7" border size="medium">700元</el-radio>
              <el-radio v-model="price" label="8" border size="medium">800元</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <p>选择数量</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <div class="number-input-wrapper">
              <span @click="reduce">-</span>
              <input v-bind:value="number" class="buy-num" readonly>
              <span @click="add" :plain="true">+</span>
            </div>
            <div class="message">*三张以内为连座，3张以上尽量连座，不同张数、不同时间票价可能不同</div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <p>合计</p>
          </el-col>
          <el-col :span="20" class="price-list">
            <p class="money" style="margin-top: 4px">
              <span class="order-price">177</span>
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
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'nav',
    components: {
      ElRow
    },
    data() {
      return {
        time : "1",
        price: "1",
        number: 1
      }
    },
    methods: {
      add:function(event){
        if(this.number++==6){
          this.number = 6;
          this.$message('购买的票数不能大于5张');
        }
      },
      reduce:function(event){
        if(this.number--==1){
          this.number = 1;
        }
      },
      buyTicket:function (event) {

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color:#f7f7f7;
  .container{
    width: 94%;
    display: table;
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 #eee;
    margin-top: 3%;
    border: 1px solid #eee;
    .poster {
      float: left;
      width: 24%;
      margin-top: -3%;
      margin-left: -3%;
      img {
        width: 100%;

        border-radius: 18px;
        background-color: #fff;
        box-shadow: 0 4px 16px 0 #ccc;
      }
      .count {
        line-height: 24px;
        color: #777;
        font-size: 12px;
        position: relative;
        text-align: center;
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
          .message{
            color: #F78989;
            font-size: 13px;
            text-align: center;
          }
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
