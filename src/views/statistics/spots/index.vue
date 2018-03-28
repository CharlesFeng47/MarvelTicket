<template>
  <div>
    <h1>场馆收入统计</h1>
    <div v-loading="spotStatisticsLoading">
      <PieChart
        :data="spotStatistics"
        :legend-data="spotStatisticsLegend"
        :title-name="spotStatisticsTitleName">
      </PieChart>
    </div>
  </div>
</template>

<script>
  import PieChart from '../PieChart'
  import { mapGetters } from 'vuex'
  import { getSpotsStatistics } from '../../../api/statistics'

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
        // 订单的统计数据
        spotStatisticsTitleName: '场馆收入统计',
        spotStatisticsLegend: [],
        spotStatistics: [],

        spotStatisticsLoading: true
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getSpotsStatistics(this.token).then(response => {
          if (response.state === 'OK') {
            this.spotStatistics = JSON.parse(response.object)
            console.log(this.spotStatistics)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.spotStatisticsLoading = false
      }).catch(() => {
        this.spotStatisticsLoading = false
      })
    }
  }
</script>

<style scoped>

</style>
