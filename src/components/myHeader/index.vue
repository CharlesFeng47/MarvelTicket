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
                <LoginPanel></LoginPanel>
          </el-col>
        </el-row>
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
      Popover,
      InputGroup,
      LoginPanel
    },

    data() {
      return {

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


  .my-header {
    border-bottom: #E5EAEF solid 1px;
  }
</style>
