<template>
  <div>
    <MyHeader></MyHeader>
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row :gutter="60" style="margin-top: 40px">
          <el-col span="4">
            <LeftNav/>
          </el-col>
          <el-col span="20">
            <OrderPanel/>
            <Like/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyFooter from '../../components/myFooter/index'
  import MyHeader from '../../components/myHeader/index'
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import Like from './like/index'
  import LeftNav from './nav/index'
  import OrderPanel from './order/index'
  export default {
    name: 'center',
    components: {
      BreadCrumb,
      MyHeader,
      MyFooter,
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
