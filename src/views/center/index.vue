<template>
  <div>
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row :gutter="60" style="margin-top: 40px">

          <!-- 左侧导航 -->
          <el-col :span="4">
            <LeftNav/>
          </el-col>

          <el-col :span="20">
            <transition name="fade">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LeftNav from './nav/index'

  export default {
    name: 'center',
    components: {
      LeftNav
    },
    data() {
      return {
        plan: {}
      }
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
