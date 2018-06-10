<template>
  <div>
    <!-- 因为二级导航太向下了，把他向下的去掉 TODO gy解决一下 -->
    <h1 style="margin-top: 80px">Hello</h1>

    <!-- 筛选排序表单 -->
    <el-form ref="criteriaForm" :model="criteriaForm" label-width="80px">
      <el-form-item label="筛选">
        <el-radio-group v-model="criteriaForm.pick">
          <el-radio label="全部时间"></el-radio>
          <el-radio label="本周末"></el-radio>
          <el-radio label="一周内"></el-radio>
          <el-radio label="一月内"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-radio-group v-model="criteriaForm.sort">
          <el-radio label="按热度"></el-radio>
          <el-radio label="按开演时间"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!--  TODO 计划类型的路径参数 -->
    <h1>{{ tagType }}</h1>

    <template v-for="briefItem in  scheduleBriefs">
      <el-col :span="12">
        <BriefItem :schedule-brief="briefItem"/>
      </el-col>
    </template>
  </div>
</template>

<script>
  import BriefItem from './brief/index'

  export default {
    components: {
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
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          },
          {
            title: '【广州站】孟京辉戏剧作品《一个陌生女人的来信》',
            saleType: 3,
            time: '2018.08.03-2018.08.05',
            spot: '广州友谊剧院',
            viewNum: 1480,
            favoriteNum: 20
          }
        ]
      }
    },
    computed: {
      tagType: function () {
        return this.$route.query.tagType
      }
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>
