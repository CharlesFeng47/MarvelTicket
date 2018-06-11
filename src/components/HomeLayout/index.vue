<template>
  <div>
    <MyHeader/>
    <el-row>
      <el-col :span="18" :offset="3">
        <Navigate/>
      </el-col>
    </el-row>
    <Carousel v-if="this.$route.meta.isHome"/>
    <el-row>
      <el-col :span="18" :offset="3">
        <router-view></router-view>
      </el-col>
    </el-row>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Navigate from './Navigate/index'
  import Carousel from '../../views/home/carousel/index'
  import MyFooter from '../../components/MyFooter/index'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      MyHeader,
      Navigate,
      Carousel,
      MyFooter
    },
  }
</script>

<style scoped>

</style>
