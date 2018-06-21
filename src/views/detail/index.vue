<template>
  <div>
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row>
          <BreadCrumb/>
        </el-row>
        <el-row>
          <Detail/>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import Detail from './ticket/index'
  export default {
    name: 'detail',
    components: {
      BreadCrumb,
      Detail,
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
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
