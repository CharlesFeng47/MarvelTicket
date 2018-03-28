<template>
  <div v-loading="orderStatisticsLoading">
    <div class="chart-wrapper">
      <pie-chart :order-statistics="orderStatistics">
      </pie-chart>
    </div>
  </div>
</template>

<script>
  import PieChart from './PieChart'

  import { mapGetters } from 'vuex'
  import { getOrderStatistics } from '../../../api/statistics'

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
        orderStatistics: [],

        orderStatisticsLoading: true
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getOrderStatistics(this.token).then(response => {
          if (response.state === 'OK') {
            this.orderStatistics = JSON.parse(response.object)
            console.log(this.orderStatistics)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.orderStatisticsLoading = false
      }).catch(() => {
        this.orderStatisticsLoading = false
      })
    }
  }
</script>

<style scoped>
  .chart-wrapper {
    margin-top: 20px;
  }
</style>
