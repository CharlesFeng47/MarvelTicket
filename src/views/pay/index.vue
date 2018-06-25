<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row></el-row>
      </el-col>
    </el-row>
    <!--<el-row>-->
      <!--<el-col :offset="3" :span="18">-->
        <!--<el-row :gutter="60" style="margin-top: 40px">-->
          <!--<el-col :span="4">-->
            <!--<LeftNav/>-->
          <!--</el-col>-->
          <!--<el-col :span="20">-->
            <!--&lt;!&ndash;<transition name="fade">&ndash;&gt;-->
              <!--&lt;!&ndash;<keep-alive>&ndash;&gt;-->
                <!--&lt;!&ndash;<router-view></router-view>&ndash;&gt;-->
              <!--&lt;!&ndash;</keep-alive>&ndash;&gt;-->
            <!--&lt;!&ndash;</transition>&ndash;&gt;-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>

  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'pay',
    components: {
      ElRow

    },
    data() {
      return {

      }
    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
