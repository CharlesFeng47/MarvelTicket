<template>
  <div>
    <el-row>
      <h3>座位图</h3>
    </el-row>
    <el-row>
      <!--左侧为座位表-->
      <el-col id="seat-region-only" :span="18" style="height: 600px;overflow-x: auto;overflow-y: auto">
        <div id="seat-map">
          <div class="front-indicator">Front</div>
        </div>
      </el-col>

      <!--右侧为图例-->
      <el-col :span="6">
        <div id="legend" class="seatCharts-legend">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  // 场馆座位图展示
  export default {
    name: 'SeatChartDisplayOnly',
    computed: {
      ...mapGetters([
        'spot_seats_map',
        'cur_seat_type_count',
        'seat_names'
      ])
    },
    data() {
      return {
        seatLegendItems: []
      }
    },
    mounted: function() {
      var _this = this
      setTimeout(function() {
        _this.computeSeatLegendNames()
        _this.seatChartInit()
      }, 500)
    },
    methods: {
      computeSeatLegendNames() {
        var i = 0
        for (var temp in this.seat_names) {
          this.seatLegendItems[i] = []
          this.seatLegendItems[i][0] = this.getRelatedChar(i)
          this.seatLegendItems[i][1] = 'available'
          this.seatLegendItems[i][2] = this.seat_names[temp]
          i++
          if (i >= this.cur_seat_type_count) break
        }
      },
      getRelatedChar: function(i) {
        return String.fromCharCode(i + 97)
      },
      seatChartInit() {
        var _this = this
        // 需要先将之前的内容给清空，不然不会重新生成
        $('#seat-region-only').html('<div id="seat-map">\n' +
          '          <div class="front-indicator">Front</div>\n' +
          '        </div>')
        $('#seat-map').seatCharts({
          map: _this.spot_seats_map,
          seats: {
            a: {
              classes: 'a-class'
            },
            b: {
              classes: 'b-class'
            },
            c: {
              classes: 'c-class'
            },
            d: {
              classes: 'd-class'
            },
            e: {
              classes: 'e-class'
            },
            f: {
              classes: 'f-class'
            },
            g: {
              classes: 'g-class'
            },
            h: {
              classes: 'h-class'
            },
            i: {
              classes: 'i-class'
            }
          },
          naming: {
            left: true,
            top: true
          },
          legend: {
            node: $('#legend'),
            items: this.seatLegendItems
          },
          click: function() {
            console.log('seat click')
            return this.style()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
