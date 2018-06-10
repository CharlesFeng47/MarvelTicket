<template>
  <div class="my-header">
    <el-row>
      <el-col :span="3" :offset="2">
        <a href="/home">
        <div class="logo">
          Marvel
          <!--<img src="../../assets/logo.png" width="100%"/>-->
        </div>
        </a>
      </el-col>
      <el-col :span="2" class="location">
        <div class="location-choose">
          <Popover></Popover>
        </div>
      </el-col>
      <el-col :span="7" :offset="2" class="search-group">
        <InputGroup></InputGroup>
      </el-col>
      <el-col :span="3" :offset="3">
        <div style="margin-top: 35px">
          <span class="svg-container">
            <a href="/center"><svg-icon icon-class="user"/></a>
            <LoginPanel></LoginPanel>
        </span>
        </div>
      </el-col>
    </el-row>
  </div>
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
        message: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
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
    margin-left: 25px;
    border-left: #dddddd 3px solid;
    padding-left: 15px;
  }

  .search-group {
    margin-top: 35px;
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
