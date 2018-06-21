<template>
  <div class="brief_container" @click="checkDetail">
    <div class="poster">
      <img :src="programBrief.posterSrc">
      <div class="count">
        <el-row>
          <i class="el-icon-view"></i>{{ programBrief.viewNum }}人浏览
        </el-row>
        <el-row>
          <i class="el-icon-star-on"></i><span id="favourNum">{{ programBrief.favoriteNum}}</span>人想看
        </el-row>
      </div>
    </div>
    <div class="detail" >
      <div class="show-title">
        {{ programBrief.title }}
      </div>

      <div class="message">{{ programBrief.description }}</div>

      <!--<el-tag type="info" v-if="programBrief.saleType===1">未开售</el-tag>-->
      <!--<el-tag type="warning" v-if="programBrief.saleType===2">预售</el-tag>-->
      <el-tag type="success" v-if="programBrief.saleType==='售票中'">售票中</el-tag>
      <el-tag type="danger" v-if="programBrief.saleType==='补票中'">补票中</el-tag>

      <div class="show-info1">
        <i class="el-icon-time"/><span style="font-size: 12px">{{ programBrief.time }}</span>
      </div>
      <div class="show-info2">
        <i class="el-icon-location-outline"/><span style="font-size: 12px">{{ programBrief.spot }}</span>
      </div>

      <div style="float: right;margin-top: -20px;font-size: 18px">
        <span style="color: #F2593F">￥ {{ programBrief.basePrice }}</span>&nbsp;起
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BriefItem",
    props: [
      'programBrief'
    ],
    data() {
      return {
      }
    },
    methods: {
      // 查看详情
      checkDetail: function () {
        console.log(this.programBrief)
        this.$router.push('/detail/' + this.programBrief.id)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color: #f7f7f7;
  .brief_container {
    :hover{
      cursor: pointer;
    }
    /*width: 500px;*/
    display: table;
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 1px 20px 0 #eee;
    margin-top: 50px;
    margin-bottom: 50px;
    border: 1px solid #eee;
    margin-left: 25px;
    .poster {
      float: left;
      width: 32%;
      margin-top: -25px;
      margin-left: -25px;
      img {
        /*width: 160px;*/
        width: 100%;
        border-radius: 8px;
        /*height: 180px;*/
        height: 220px;
        background-color: #fff;
        box-shadow: 0 4px 16px 0 #ccc;
      }
      .count {
        line-height: 24px;
        color: #777;
        font-size: 12px;
        position: relative;
        text-align: left;
        margin-left: 40px;
      }
    }
    .detail {
      width: 68%;
      padding: 20px 12px 20px 30px;
      float: left;
      .el-row {
        margin-bottom: 10px;
      }
      .el-tag{
        margin-top: 15px;
        border-radius: 15px;
      }
      .message{
        font-size: 12px;
        color: #aaa;
        padding: 5px 0;
        line-height: 16px;
      }
      .show-title {
        font-size: 16px;
        font-weight: 500;
        color: #331612;
        line-height: 30px;
        height: 60px;
        overflow:hidden;
        max-lines: 2;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .show-info1 {
        margin-left: 0px;
        margin-top: 20px;
        color: #F78989;
      }
      .show-info2 {
        margin-left: 0px;
        margin-top: 10px;
        color: #F78989;
      }
    }
  }
</style>
