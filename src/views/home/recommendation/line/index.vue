<template>
  <div class="recommendation">
    <el-row>
      <el-col :span="12">
        <h1>{{ line.title }}</h1>
      </el-col>

      <el-col :span="12">
        <!--TODO 查看更多的图标可以替换为真正的图标-->
        <p class="find_more" style="text-align: right;margin-top: 30px;"><span @click="findMore()">查看更多></span></p>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="25">
      <el-col :span="5">
        <RecommendationItem :schedule-brief="line.recommendations[0]"></RecommendationItem>
      </el-col>
      <el-col :span="5">
        <RecommendationItem :schedule-brief="line.recommendations[1]"></RecommendationItem>
      </el-col>
      <el-col :span="5">
        <RecommendationItem :schedule-brief="line.recommendations[2]"></RecommendationItem>
      </el-col>
      <el-col :span="5">
        <RecommendationItem :schedule-brief="line.recommendations[3]"></RecommendationItem>
      </el-col>
      <el-col :span="5">
        <RecommendationItem :schedule-brief="line.recommendations[4]"></RecommendationItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RecommendationItem from './item/index'
  import { getProgramTypeIdByEnum } from "../../../../utils/program_helper";

  export default {
    name: 'RecommendationLine',
    components: {
      RecommendationItem
    },
    props: [
      'line'
    ],
    methods:{
      findMore:function(){
        var type = getProgramTypeIdByEnum(this.line.title);
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

<style scoped>
  .recommendation{
    padding-bottom: 30px;
  }
  .find_more{
    text-align: right;
    margin-top: 30px;
  }
  .find_more :hover{
    color: #F78978;
    cursor: pointer;
  }
</style>
