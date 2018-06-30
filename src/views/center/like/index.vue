<template>
  <div class="like-panel">

    <el-row v-if="maxPage !== 0">
    <template v-for="(briefItem, index) in showingBriefs">
      <el-col v-if="index%2===0" style="width: 48%">
        <BriefItem :program-brief="briefItem" @changeFavoriteNum="changeFavoriteNum"/>
      </el-col>
      <el-col v-if="index%2===1" style="width: 48%;margin-left: 4%">
        <BriefItem :program-brief="briefItem" @changeFavoriteNum="changeFavoriteNum"/>
      </el-col>
    </template>
    </el-row>
    <div v-else style="">
      你还没有收藏节目！
    </div>
    <div>
      <Pagination :max_page="maxPage" :current_page="currentPage" v-on:changePage="changePage"/>
    </div>
  </div>
</template>

<script>
  import BriefItem from '../../schedule/brief/index'
  import Pagination from '../../../components/pagination/index'
  import { getStarPrograms } from '../../../api/user'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      BriefItem,
      Pagination
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        curTypeSchedulesLoading: false,
        // 全部的概况
        programBriefsOrigin: [],
        // 当前展示的当页概况
        showingBriefs: [],
        // 当前的页码
        currentPage: 0,
        // 最大页码
        maxPage: 0,
        // 每页的条数
        everyPage: 6
      }
    },
    mounted: function() {
      // 普通查看非搜索
      this.initLike()
    },
    watch: {
      // 页码改变后，重新加载内容
      currentPage: {
        handler: function(newVal, oldVal) {
          this.refreshBriefs()
        }
      }
    },

    methods: {
      // 根据节目类型从后端获取此类型的节目数据
      initLike: function(type) {
        this.curTypeSchedulesLoading = true
        new Promise((resolve, reject) => {
          getStarPrograms(this.token).then(curPrograms => {
            console.log(curPrograms)
            this.fulfillProgramBriefs(curPrograms)
            this.refreshBriefs()
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
      fulfillProgramBriefs: function(curPrograms) {
        this.programBriefsOrigin = []
        for (var index = 0; index < curPrograms.length; index++) {
          var brief = {}
          brief.id = curPrograms[index].id
          brief.title = curPrograms[index].programName
          brief.description = curPrograms[index].description
          brief.posterSrc = curPrograms[index].imageUrl
          brief.saleType = curPrograms[index].saleType
          brief.time = curPrograms[index].time
          brief.spot = curPrograms[index].venueName
          brief.viewNum = curPrograms[index].scanVolume
          brief.favoriteNum = curPrograms[index].favoriteVolume
          brief.basePrice = curPrograms[index].lowPrice
          this.programBriefsOrigin.push(brief)
        }

        console.log('fulfill ProgramBriefs finished')
        this.initDefaultInfo()
      },

      // 初始化界面中的页码信息
      initDefaultInfo: function() {
        this.currentPage = 1
        this.maxPage = Math.ceil(this.programBriefsOrigin.length / this.everyPage)
      },

      // 因为 当前页号修改 / 筛选排序标准修改 导致界面展示的数据改变
      refreshBriefs: function() {
        this.showingBriefs = []
        for (var index = (this.currentPage - 1) * this.everyPage; index < this.currentPage * this.everyPage && index < this.programBriefsOrigin.length; index++) {
          this.showingBriefs.push(this.programBriefsOrigin[index])
        }
      },
      // 子组件 Pagination 修改后回调此组件更新 currentPage，以更新展示的数据
      changePage: function(page) {
        this.currentPage = page
      },
      // 子组件 BriefItem 中点击收藏后回调此组件更新 programDetail
      changeFavoriteNum: function(id, isStar) {
        for (let i = 0; i < this.programBriefsOrigin.length; i++) {
          // 筛选出当前节目
          if (this.programBriefsOrigin[i].id !== id) continue
          console.log(id + '_____' + this.programBriefsOrigin[i].star)
          this.programBriefsOrigin[i].favoriteNum += (isStar ? 1 : -1)
        }
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
