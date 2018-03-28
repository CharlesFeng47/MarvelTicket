<template>
  <div>
    <el-row>
      <h1>会员等级情况</h1>
      <div v-loading="memberLevelStatisticsLoading">
        <PieChart
          :data="memberLevelStatistics"
          :legend-data="memberLevelStatisticsLegend"
          :title-name="memberLevelStatisticsTitleName">
        </PieChart>

      </div>
    </el-row>
    <el-row>
      <h1>会员订单情况</h1>
      <div v-loading="memberOrderStatisticsLoading">
        <PieChart
          :data="memberOrderStatistics"
          :legend-data="memberOrderStatisticsLegend"
          :title-name="memberOrderStatisticsTitleName">
        </PieChart>
      </div>
    </el-row>
  </div>
</template>

<script>
  import PieChart from '../PieChart'

  import { mapGetters } from 'vuex'
  import { getMemberLevelStatistics, getMemberOrderStatistics } from '../../../api/statistics'

  export default {
    components: {
      PieChart
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        // 会员的统计数据
        memberLevelStatisticsTitleName: '会员等级统计',
        memberLevelStatisticsLegend: ['等级1', '等级2', '等级3', '等级4', '等级5', '等级6', '等级7', '等级8'],
        memberLevelStatistics: [],
        memberLevelStatisticsLoading: true,

        memberOrderStatisticsTitleName: '会员订单统计',
        memberOrderStatisticsLegend: ['已下单', '逾期未付款自动取消', '已支付', '配票失败', '已检票', '已过期', '已退款'],
        memberOrderStatistics: [],
        memberOrderStatisticsLoading: true
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getMemberLevelStatistics(this.token).then(response => {
          if (response.state === 'OK') {
            this.memberLevelStatistics = JSON.parse(response.object)
            console.log(this.memberLevelStatistics)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.memberLevelStatisticsLoading = false
      }).catch(() => {
        this.memberLevelStatisticsLoading = false
      })

      new Promise((resolve, reject) => {
        getMemberOrderStatistics(this.token).then(response => {
          if (response.state === 'OK') {
            this.memberOrderStatistics = JSON.parse(response.object)
            console.log(this.memberOrderStatistics)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.memberOrderStatisticsLoading = false
      }).catch(() => {
        this.memberOrderStatisticsLoading = false
      })
    }
  }
</script>

<style scoped>

</style>
