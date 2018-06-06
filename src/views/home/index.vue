<template>
  <div>
    <MyHeader/>
    <Carousel/>

    <!--方案一-->
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="2"></el-col>
      <el-col :span="3">
        <Item/>
      </el-col>
      <el-col :span="3">
        <Item/>
      </el-col>
      <el-col :span="3">
        <Item/>
      </el-col>
      <el-col :span="3">
        <Item/>
      </el-col>
      <el-col :span="3">
        <Item/>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>

    <!--方案二-->
    <Recommendation></Recommendation>

  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Carousel from './carousel/index'
  import Item from './recommendation/line/item/Item'
  import Recommendation from './recommendation/index'

  export default {
    name: 'home',
    components: {
      Item,
      MyHeader,
      Carousel,
      Recommendation
    },
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
