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
        var type = 0;
        switch(this.line.title) {
          case "演唱会":
            type = 1;
            break;
          case "音乐会":
            type = 2;
            break;
          case "舞蹈芭蕾":
            type = 3;
            break;
          case "话剧歌剧":
            type = 4;
            break;
          case "曲艺杂谈":
            type = 5;
            break;
          case "体育赛事":
            type = 6;
            break;
          case "儿童亲子":
            type = 7;
            break;
          case "展览休闲":
            type = 8;
            break;
        }
          this.$router.push({
            path:"/schedule",
            query:{
              type:type
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
