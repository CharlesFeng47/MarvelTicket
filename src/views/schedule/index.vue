<template>
  <div v-loading="curTypeSchedulesLoading">
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
          <el-radio label="按热度降序"></el-radio>
          <el-radio label="按开演时间升序"></el-radio>
          <el-radio label="按开演时间降序"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template v-for="(briefItem,index) in showingBriefs">
      <el-col v-if="index%2===0" style="width: 48%">
        <BriefItem :program-brief="briefItem"/>
      </el-col>
      <el-col v-if="index%2===1" style="width: 48%;margin-left: 4%">
        <BriefItem :program-brief="briefItem"/>
      </el-col>
    </template>

    <el-row></el-row>
    <div>
      <Pagination :max_page="maxPage" :current_page="currentPage" v-on:changePage="changePage"/>
    </div>

  </div>
</template>

<script>
  import BriefItem from './brief/index'
  import Pagination from '../../components/pagination/index'
  import { getProgramsByType } from '../../api/program'
  import { getProgramTypeEnum } from '../../utils/program_helper'
  import { toPick, toSort } from '../../utils/program_helper'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      BriefItem,
      Pagination
    },
    data() {
      return {
        criteriaForm: {
          pick: '全部时间',
          sort: '按热度降序'
        },

        curTypeSchedulesLoading: false,
        // 全部的概况
        programBriefsOrigin: [],
        // 筛选后的概况
        filteredProgramBriefs: [],
        // 当前展示的当页概况
        showingBriefs: [],
        // 当前的页码
        currentPage: 1,
        // 最大页码
        maxPage: 1,
        // 每页的条数
        everyPage: 12
      }
    },
    computed: {
      ...mapGetters([
        'cur_city'
      ]),
      type: function () {
        return this.$route.query.type
      }
    },
    mounted: function () {
      this.initCurProgramsByType(this.$route.query.type)
    },
    watch: {
      // 根据路由参数选定当前加载的类型
      // TODO 讨论路由更换时原有内容要不要清空
      type: {
        handler: function (newVal, oldVal) {
          this.initCurProgramsByType(newVal)
        }
      },
      currentPage: {
        handler: function (newVal, oldVal) {
          this.refreshBriefs()
        }
      },

      // 节目的筛选条件修改显示的内容并排序
      'criteriaForm.pick': {
        handler: function (newVal, oldVal) {
          this.filteredProgramBriefs = toPick(newVal, this.programBriefsOrigin)
          console.log('after filter: ' + this.filteredProgramBriefs.length + '<==' + this.programBriefsOrigin.length)

          this.filteredProgramBriefs = toSort(this.criteriaForm.sort, this.filteredProgramBriefs)

          // 筛选之后回到第一页，并且筛选可能更新分页页码数
          this.currentPage = 1
          this.maxPage = Math.ceil(this.filteredProgramBriefs.length / this.everyPage)

          // 强制更新（因为currentPage实际可能未修改，不触发watch）
          this.refreshBriefs()
        }
      },

      // 节目的排序条件修改
      'criteriaForm.sort': {
        handler: function (newVal, oldVal) {
          this.filteredProgramBriefs = toSort(newVal, this.filteredProgramBriefs)

          // 排序之后回到第一页
          this.currentPage = 1

          // 强制更新（因为currentPage实际可能未修改，不触发watch）
          this.refreshBriefs()
        }
      }
    },

    methods: {
      // 从后端获取数据
      initCurProgramsByType: function (type) {
        this.curTypeSchedulesLoading = true
        new Promise((resolve, reject) => {
          getProgramsByType(this.cur_city, getProgramTypeEnum(type)).then(response => {
            if (response.state === 'OK') {
              const curPrograms = JSON.parse(response.object)
              console.log(curPrograms)
              this.fulfillProgramBriefs(curPrograms)
              this.refreshBriefs()
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.curTypeSchedulesLoading = false
        }).catch(() => {
          this.curTypeSchedulesLoading = false
        })
      },
      // 将获取的数据装载到页面中
      fulfillProgramBriefs: function (curPrograms) {
        this.programBriefsOrigin = []
        for (var index = 0; index < curPrograms.length; index++) {
          var brief = {}
          brief.id = curPrograms[index].id
          brief.title = curPrograms[index].programName
          brief.description = curPrograms[index].description
          brief.posterSrc = curPrograms[index].poster
          brief.saleType = curPrograms[index].saleType
          brief.time = curPrograms[index].time
          brief.spot = curPrograms[index].venueName
          brief.viewNum = curPrograms[index].scanVolume
          brief.favoriteNum = curPrograms[index].favoriteVolume
          brief.basePrice = curPrograms[index].lowPrice
          this.programBriefsOrigin.push(brief)
        }

        console.log('fulfillProgramBriefs finished')
        this.initDefaultInfo()
      },

      // 初始化界面中的页码信息
      initDefaultInfo: function () {
        this.filteredProgramBriefs = []
        for (let i = 0; i < this.programBriefsOrigin.length; i++) {
          this.filteredProgramBriefs.push(this.programBriefsOrigin[i])
        }
        this.filteredProgramBriefs = toSort(this.criteriaForm.sort, this.filteredProgramBriefs)

        this.currentPage = 1
        this.maxPage = Math.ceil(this.filteredProgramBriefs.length / this.everyPage)
      },

      // 因为 当前页号修改 / 筛选排序标准修改 导致界面展示的数据改变
      refreshBriefs: function () {
        this.showingBriefs = []
        for (var index = (this.currentPage - 1) * this.everyPage;
             index < this.currentPage * this.everyPage && index < this.filteredProgramBriefs.length;
             index++) {
          this.showingBriefs.push(this.filteredProgramBriefs[index])
        }
      },

      // 子组件 Pagination 修改后回调此组件更新 currentPage，以更新展示的数据
      changePage: function (page) {
        this.currentPage = page
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $border-color: #f7f7f7;
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
        .el-radio__label {
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
