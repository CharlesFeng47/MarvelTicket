<template>
  <div>
    <MyHeader/>
    <Carousel/>
    <!--TODO 简单的写一下 -->
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="2">

      </el-col>
      <el-col :span="3">
        <Brief/>
      </el-col>
      <el-col :span="3">
        <Brief/>
      </el-col>
      <el-col :span="3">
        <Brief/>
      </el-col>
      <el-col :span="3">
        <Brief/>
      </el-col>
      <el-col :span="3">
        <Brief/>
      </el-col>
      <el-col :span="2">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MyHeader from '../myHeader/index'
  import Carousel from '../carousel/index'
  import Brief from '../brief/index';
  export default {
    name: 'home',
    components: {
      Brief,
      MyHeader,Carousel },
    data() {
      return {
        userType: 'member'
      }
    },
    methods: {}
  }
</script>


<style scoped>

</style>
