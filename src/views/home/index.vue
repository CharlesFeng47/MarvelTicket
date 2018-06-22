<template>
  <div>
    <!-- 首页推荐 -->
    <!--<el-row>-->
      <!--<el-col :span="20" :offset="2">-->
        <Recommendation></Recommendation>
      <!--</el-col>-->
    <!--</el-row>-->

    <!-- 快捷按钮 -->

  </div>
</template>

<script>
  import Recommendation from './recommendation/index'

  export default {
    name: 'home',
    components: {
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


