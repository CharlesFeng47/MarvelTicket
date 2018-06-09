<template>
  <div>
    <MyHeader></MyHeader>
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row>
          <BreadCrumb/>
        </el-row>
        <el-row>
          <Ticket/>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>

  import MyHeader from '../../components/myHeader/index'
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import Ticket from './ticket/index'
  export default {
    name: 'detail',
    components: {
      BreadCrumb,
      Ticket,
      MyHeader
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
