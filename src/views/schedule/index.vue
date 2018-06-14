<template>
  <div>
    <!-- 因为二级导航太向下了，把他向下的去掉 TODO fjj看不懂-->

    <!-- 筛选排序表单 -->
    <el-form class="schedule" ref="criteriaForm" :model="criteriaForm" label-width="80px">
      <el-form-item label="筛选:">
        <el-radio-group v-model="criteriaForm.pick">
            <el-radio label="全部时间"></el-radio>
            <el-radio label="本周末"></el-radio>
            <el-radio label="一周内"></el-radio>
            <el-radio label="一月内"></el-radio>


        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:">
        <el-radio-group v-model="criteriaForm.sort">
          <el-radio label="按热度"></el-radio>
          <el-radio label="按开演时间"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!--&lt;!&ndash;  TODO 计划类型的路径参数???看不懂 &ndash;&gt;-->
    <!--<h1>{{ type }}</h1>-->

    <template v-for="(briefItem,index) in  scheduleBriefs">
      <el-col v-if="index%2==0" style="width: 48%">
        <BriefItem :schedule-brief="briefItem"/>
      </el-col>
      <el-col v-if="index%2==1" style="width: 48%;margin-left: 4%">
        <BriefItem :schedule-brief="briefItem"/>
      </el-col>
    </template>
  </div>
</template>

<script>
  import BriefItem from './brief/index'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      BriefItem
    },
    data() {
      return {
        criteriaForm: {
          pick: '全部时间',
          sort: '按热度'
        },

        // TODO 获取内容填充
        scheduleBriefs: [
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20,
            basePrice: 248
          }
        ]
      }
    },
    computed: {
      type: function () {
        return this.$route.query.type
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color:#f7f7f7;
  .schedule {
    .el-form-item {
      .el-form-item__label {
        text-align: left;
        /*padding-left: 3px;*/
        /*border-left: 2px solid red;*/
      }
    }
    .el-radio-group {
      width: 50%;
      margin-top: -1px;
      .el-radio {
        /*width: 20%;*/
        margin-top: 0px;
        margin-right: 20px;
        border-radius: 20px;
        /*<!--border: 2px solid $border-color;-->*/
        height: 28px;
        line-height: 30px;
        .el-radio__input {
          display: none;
        }
        .el-radio__label{
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 1px;
        }
      }
      .is-checked {
        background-color: #F2593F;
        color: white;
        /*border: 2px #FD6857 solid;*/
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: white;
      }
    }
  }

</style>
