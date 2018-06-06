<template>
  <div class="my-header">
    <el-row>
      <el-col :span="3" :offset="2">
        <div class="logo">
          <img src="../../assets/logo.png" width="100%"/>
        </div>
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
          <svg-icon icon-class="user"/>
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
    margin: 15px 0px 0px 30%;
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
