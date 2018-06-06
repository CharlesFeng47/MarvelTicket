<template>
  <div class="login-container">
    <el-form :inline="true">
      <el-form-item class="input-block">
        <el-input  placeholder="搜索演出信息"></el-input>
      </el-form-item>
      <el-form-item class="button-block">
        <el-button type="danger" @click="onSubmit"><i class="el-icon-search"></i>&nbsp;查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'input-group',
    components: {},
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    background-color: #F2F2F2;
    border-radius: 20px;
    height: 40px;
    .input-block{
      width: 78%;
      margin: 0px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #757575;
      padding-left: 10px;
      margin-left: 15px;
      width: 100%;
      padding-right: 0px;
    }
    .el-form-item__content{
      width: 100%;
    }
    .el-input{
      width: 100%;
    }
    .button-block{
      width: 20%;
      margin: 0px;
    }
    button {
      margin-top: 4px;
      margin-bottom: 3px;
      border-radius: 16px;
      height: 33px;
      padding-top: 10px;
      width: 100%;
    }
    /*.el-input {*/
      /*display: inline-block;*/
      /*height: 47px;*/
      /*width: 85%;*/
    /*}*/
    /*.tips {*/
      /*font-size: 14px;*/
      /*color: #fff;*/
      /*margin-bottom: 10px;*/
    /*}*/

    /*.title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }*/
   /* .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }*/
  }
</style>

