<template>
  <div class="login-container">
    <el-form :inline="true">
      <el-form-item class="input-block">
        <div style="position: relative">
          <el-input v-bind="searchField" :value="searchField" @input="search" @click.stop="" placeholder="搜索演出信息"></el-input>
        </div>
        <div id="search-panel" @click.stop="" v-show="isShow">
          <ul v-show = "!isLoading">
            <li><a href="/">【杭州站】爱丽丝奇境缤纷之旅</a></li>
            <li><a href="/">【上海站】黏黏怪物研究所</a></li>
            <li><a href="/">【杭州站】爱丽丝奇境缤纷之旅</a></li>
            <li><a href="/">【上海站】黏黏怪物研究所</a></li>
            <li><a href="/">【上海站】黏黏怪物研究所</a></li>
          </ul>
          <div class="onLoading" v-show = "isLoading">
            <i class="el-icon-loading"></i>
          </div>
        </div>
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
    data() {
      return{
        isLoading : true,
        searchField : ""
      }
    },
    props:[
      "isShow"
    ],
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      search(str){
        if(str!="") {
          this.$emit('showPanel')
          this.searchField = str;
          this.isLoading = true;
        }else{
          this.$emit('hidePanel')
        }
        // alert(str);
      },
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
    .input-block {
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
    .el-form-item__content {
      width: 100%;
    }
    .el-input {
      width: 100%;
    }
    .button-block {
      width: 20%;
      margin: 0px;
    }
    button {
      width: 100%;
      margin-top: 4px;
      margin-bottom: 3px;
      border-radius: 16px;
      height: 32px;
      padding-top: 9px;
    }
    #search-panel {
      position: absolute;
      border: solid #EEEEEE 1px;
      width: 100%;
      margin-left: 4%;
      background-color: white;
      z-index: 1000;
      .onLoading {
        width: 100%;
        text-align: center;
        height: 100px;
        font-size: 40px;
        line-height: 100px;
        i {
          color: #F78989
        }
      }
      ul {
        padding: 0px;
        margin: 5px 0px 5px;
        li {
          list-style-type: none !important;
          line-height: 30px;
          a{
            padding: 2px;
            font-size: 13px;
          }
          :hover{
            background-color: #F3F5F8;
          }
        }
      }
      li>a {
        padding: 14px;
        display: block;
        color: #212329;
      }
    }
  }
</style>

