<template>
  <div>
    <h1>重庆江北大剧院</h1>

    <!--基本信息-->
    <el-row class="basic_info">
      <el-col :span="4">
        <el-col :span="8">
          <h3>编号ID</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="primary" class="basic_content">0000001</el-tag>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="8">
          <h3>密码</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="warning" class="basic_content">******</el-tag>
        </el-col>
      </el-col>
      <!--<el-col :span="8">-->
        <!--<el-col :span="8">-->
          <!--<h3>预计开始时间</h3>-->
        <!--</el-col>-->
        <!--<el-col :span="16">-->
          <!--<el-tag type="danger" class="basic_content">{{ basicInfo.startTime }}</el-tag>-->
        <!--</el-col>-->
      <!--</el-col>-->
    </el-row>

    <!--地址-->
    <el-row class="basic_info">
      <el-col :span="1">
        <h3>地址</h3>
      </el-col>
      <el-col :span="23">
        <!--<el-tag type="info" class="basic_content">{{ textArea }}</el-tag>-->
        <el-input type="textarea" autosize disabled v-model="basicInfo.site" style="margin-top: 13px"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <!--座位图-->
      <el-col id="seat-region" :span="18" style="height: 600px;overflow-x: auto;overflow-y: auto">
        <div id="seat-map">
          <div class="front-indicator">Front</div>
        </div>
      </el-col>

      <!--图例解说-->
      <div id="legend" class="seatCharts-legend">
      </div>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'SpotInfo',
    data() {
      return {
        basicInfo: {
          name: '',
          id: '',
          password: '',
          site: '重庆江北嘴'
        }
      }
    },
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_spot')
      }
    }
  }
</script>

<style scoped>
  .basic_info {
    margin: 5px;
  }

  .basic_content {
    margin-top: 12px;
  }
</style>
