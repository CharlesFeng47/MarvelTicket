<template>
  <div>
    <!-- 首页推荐 -->
    <el-row>
      <el-col :span="20" :offset="2">
        <Recommendation></Recommendation>
      </el-col>
    </el-row>

    <!-- 快捷按钮 -->
    <div class="quick-button">
      <el-tooltip class="item" effect="light" content="回到顶部" placement="left">
        <el-button><i class="el-icon-arrow-up"></i></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import Recommendation from './recommendation/index'

  export default {
    name: 'home',
    components: {
      Recommendation
    },
    data() {
      return {
        userType: 'member'
      }
    },
    methods: {}
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .quick-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: 1px solid #f2f2f2;
    text-align: center;
    /*padding-top: 10px;*/
    /*box-sizing: border-box;*/
    background-color: #fff;
    cursor: pointer;
    font-size: 30px;
    button {
      padding: 0px;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-weight: 400;
    }
  }

  .el-tooltip__popper.is-light {
    color: whitesmoke;
    background-color: #F78989;
    border: 1px solid #F78989;
    .popper__arrow {
      /*background-color: inherit;*/
      /*border-color: red;*/
      /*color:red;*/
      /*solid-color: red*/
      /*border:  #F78989;*/
      /*background: #F78989;*/
      /*color: #F78989;*/
    }
  }
</style>
