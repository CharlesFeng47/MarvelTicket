<template>
  <el-row type="flex" justify="started" align="center" class="my-header">
    <el-col :span="1" :offset="2" style="margin-left: 10.5%">
      <a href="/home">
        <div class="logo">
          <!--Marvel-->
          <img src="../../assets/logo1.png" style="width: 110px">
        </div>
      </a>
    </el-col>
    <el-col :span="3" style="margin-left: 2%">
      <div class="location">
        <Popover v-on:changeCity=""></Popover>
      </div>
    </el-col>
    <el-col :span="8" offset="2" class="search-group">
      <InputGroup></InputGroup>
    </el-col>
    <el-col :span="3" style="margin-left: 10.2%">
      <LoginPanel></LoginPanel>
    </el-col>
  </el-row>
</template>

<script>
  import Popover from './dropdown/index'
  import InputGroup from './inputgroup/index'
  import LoginPanel from './login/index'

  export default {
    name: 'my-header',
    components: {
      Popover,
      InputGroup,
      LoginPanel
    },

    data() {
      return {}
    },
    methods: {}
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

  .my-header {
    border-bottom: #E5EAEF solid 1px;
  }
</style>
