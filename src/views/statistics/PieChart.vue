<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },

      titleName: {
        type: String
      },
      legendData: {
        type: Array
      },
      data: {
        type: Array
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      data: function() {
        this.initChart()
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        const _this = this
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: _this.legendData
          },
          calculable: true,
          series: [
            {
              name: _this.titleName,
              type: 'pie',
              roseType: 'area',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: _this.data,
              animationEasing: 'bounceInOut',
              animationDuration: 2300
            }
          ]
        })
      }
    }
  }
</script>
