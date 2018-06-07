<template>
  <div>
    <MyHeader/>
    <Carousel/>
    <el-row>
     <el-col :span="20" :offset="2">
       <Recommendation></Recommendation>
     </el-col>
    </el-row>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Carousel from './carousel/index'
  import Item from './recommendation/line/item/Item'
  import Recommendation from './recommendation/index'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'home',
    components: {
      ElRow,
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
