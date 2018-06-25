<template>
  <div class="breadcrumb">
    <ul>
      <li class="first"><span @click="gotoHome">首页&gt;</span></li>
      <li class="second"><span @click="checkProgramsOfSameType">{{ programDetail.typeEnum }}&gt;</span></li>
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
        var type = getProgramTypeIdByEnum(this.programDetail.typeEnum);
        this.$router.push({
          path: "/schedule",
          query: {
            type: type,
            isHome: false,
            isSearch: false
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
    .first:hover{
      cursor: pointer;
      color:red;
    }
    .second:hover{
      cursor: pointer;
      color:red;
    }
    .active{
      cursor: default;
    }
  }
</style>
