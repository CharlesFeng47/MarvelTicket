<template>
  <div class="breadcrumb">
    <ul>
      <!--TODO gy 这里把链接a标签去掉了，做一个hover的动态吧，就像二级导航里面一到上面后出现一个横线啊变色啊之类的-->
      <li><span @click="gotoHome">首页&gt;</span></li>
      <li><span @click="checkProgramsOfSameType">{{ programDetail.typeEnum }}&gt;</span></li>
      <li class="active">{{ programDetail.title }}</li>
    </ul>
  </div>
</template>

<script>
  import { getProgramTypeIdByEnum } from '../../utils/program_helper'

  export default {
    name: 'home',
    props: [
      'programDetail'
    ],
    methods: {
      gotoHome() {
        this.$router.push('/home')
      },

      // 查看此类型的更多节目
      checkProgramsOfSameType() {
        console.log('aaa')
        var type = getProgramTypeIdByEnum(this.programDetail.typeEnum);
        this.$router.push({
          path: "/schedule",
          query: {
            type: type
          }
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .breadcrumb {
    float: left;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #aaa;
    ul {
      padding-left: 0px;
    }
    li {
      float: left;
      list-style-type: none !important;
      text-decoration: none;
      font-size: 14px;
      color: #aaa;
    }
    a {
      text-decoration: none;
      cursor: pointer;
    }
  }
</style>
