<template>
  <div class="my-header">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row type="flex" justify="space-between">
          <el-col :span="5" style="padding-left: 1.1%">
            <a href="/home"  style="float: left">
              <div class="logo">
                Marvel
                <!--<img src="../../assets/logo.png" width="100%"/>-->
              </div>
            </a>
            <div class="location"  style="float: left">
              <div class="location-choose">
                <Popover v-on:changeCity=""></Popover>
              </div>
            </div>
          </el-col>
          <!--<el-col :span="2" class="location">-->

          <!--</el-col>-->
          <el-col :span="8"  class="search-group">
            <InputGroup></InputGroup>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 28px">
          <span class="svg-container">
            <a href="/center"><svg-icon icon-class="user"/></a>
            <LoginPanel></LoginPanel>
        </span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <!--<div class="my-header">-->
    <!--<el-row>-->
      <!--<el-col :span="3" :offset="2">-->
        <!--<a href="/home">-->
          <!--<div class="logo">-->
            <!--Marvel-->
            <!--&lt;!&ndash;<img src="../../assets/logo.png" width="100%"/>&ndash;&gt;-->
          <!--</div>-->
        <!--</a>-->
      <!--</el-col>-->
      <!--<el-col :span="2" class="location">-->
        <!--<div class="location-choose">-->
          <!--<Popover></Popover>-->
        <!--</div>-->
      <!--</el-col>-->
      <!--<el-col :span="7" :offset="2" class="search-group">-->
        <!--<InputGroup></InputGroup>-->
      <!--</el-col>-->
      <!--<el-col :span="3" :offset="3">-->
        <!--<div style="margin-top: 35px">-->
          <!--<span class="svg-container">-->
            <!--<a href="/center"><svg-icon icon-class="user"/></a>-->
            <!--<LoginPanel></LoginPanel>-->
        <!--</span>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
  <!--</div>-->
</template>

<script>
  import Popover from './dropdown/index'
  import InputGroup from './inputgroup/index'
  import LoginPanel from './login/index'

  export default {
    name: 'my-header',
    components: {
      Popover, InputGroup, LoginPanel
    },

    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        message: '',
      }
    },
    methods: {

    }
  }
</script>


<style scoped>
  .logo {
    margin: 30px 0px 20px 50%;
    font-size: 30px;
    color: #F78978;
    font-weight: 600;
  }

  .location {
    margin-top: 40px;
    margin-left: 65px;
    border-left: #dddddd 3px solid;
    padding-left: 15px;
  }

  .search-group {
    margin-top: 25px;
  }

  .svg-container {
    color: #777777;
    vertical-align: middle;
    display: inline-block;
    font-size: 22px;
    font-weight: bold;
  }

  .my-header {
    border-bottom: #E5EAEF solid 1px;
  }
</style>
