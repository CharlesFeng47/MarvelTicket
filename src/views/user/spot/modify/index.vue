<template>
  <div class="bg_container">
    <div>
      <el-steps :active="curStep" simple finish-status="success" class="content_container">
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="坐席信息" icon="el-icon-star-on"></el-step>
        <el-step title="完成" icon="el-icon-upload"></el-step>
      </el-steps>
    </div>

    <transition name="fade">
      <router-view ref="child"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SignUpIndex',
    data: function() {
      return {
        curStep: 0,
        stepControl: {
          preStep: false,
          nextStep: true,
          publish: false
        }
      }
    }
  }
</script>

<style scoped>
  .bg_container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: #2d3a4b;
  }

  .content_container {
    margin: 20px;
  }

</style>
