<template>
  <div>
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row :gutter="60" style="margin-top: 40px">
          <el-col span="4">
            <LeftNav/>
          </el-col>
          <el-col span="20">
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
  import Like from './like/index'
  import LeftNav from './nav/index'
  import OrderPanel from './order/index'
  export default {
    name: 'center',
    components: {
      OrderPanel,
      LeftNav,
      Like
    },
    data() {
      return {
        plan:{

        }
      }
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
