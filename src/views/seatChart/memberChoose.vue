<template>
  <div>
    <el-row>
      <!--左侧为座位表-->
      <el-col id="seat-member-choose" :span="18" style="height: 600px;overflow-x: auto;overflow-y: auto">
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
  import { Message } from 'element-ui'
  import { getSpot } from '../../api/user'

  // 用户选座用的
  export default {
    name: 'MemberChoose',
    data() {
      return {
        seatLegendItems: [],
        seatMap: '',

        // 选择的座位列表
        chooseSeats: [],
        // 选择的座位个数
        chooseSeatsCount: 0
      }
    },
    mounted: function() {
      var _this = this
      setTimeout(function() {
        _this.getSeatMapData()
      }, 500)
    },
    methods: {
      getSeatMapData() {
        new Promise((resolve, reject) => {
          getSpot(this.$route.query.scheduleId).then(response => {
            if (response.state === 'OK') {
              const curSpot = JSON.parse(response.object)
              this.seatMap = JSON.parse(curSpot.allSeatsJson)
              this.computeSeatLegendNames(curSpot.seatNames)
              this.seatChartInit()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      computeSeatLegendNames(seatNames) {
        var i = 0
        for (var temp in seatNames) {
          this.seatLegendItems[i] = []
          this.seatLegendItems[i][0] = this.getRelatedChar(i)
          this.seatLegendItems[i][1] = 'available'
          this.seatLegendItems[i][2] = seatNames[temp]
          i++
        }

        // 增加不可预订的图例
        this.seatLegendItems[i] = []
        this.seatLegendItems[i][0] = 'a'
        this.seatLegendItems[i][1] = 'unavailable'
        this.seatLegendItems[i][2] = '已被预定'
      },
      getRelatedChar: function(i) {
        return String.fromCharCode(i + 97)
      },
      seatChartInit() {
        var _this = this
        // 需要先将之前的内容给清空，不然不会重新生成
        $('#seat-member-choose').html('<div id="seat-map">\n' +
          '          <div class="front-indicator">Front</div>\n' +
          '        </div>')
        $('#seat-map').seatCharts({
          map: _this.seatMap,
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
            const thisId = this.settings.id
            if (this.status() === 'available') {
              // 选座不超过6个
              if (_this.chooseSeatsCount < 6) {
                _this.chooseSeats[_this.chooseSeatsCount] = thisId
                _this.chooseSeatsCount++
                return 'selected'
              } else {
                Message({
                  message: '选座购买一次不能超过 6 张票哦～',
                  type: 'error',
                  duration: 3 * 1000,
                  center: true,
                  showClose: true
                })
                return this.style()
              }
            } else if (this.status() === 'selected') {
              _this.chooseSeatsCount--

              // 先找到此座位在列表中存储的序号
              var needToDeleteIndex
              for (var curIndex in _this.chooseSeats) {
                if (_this.chooseSeats[curIndex] === thisId) {
                  needToDeleteIndex = curIndex
                }
              }
              _this.chooseSeats.splice(needToDeleteIndex, 1)
              return 'available'
            } else if (this.status() === 'unavailable') {
              return 'unavailable'
            } else {
              return this.style()
            }
          }
        })

        // TODO 设置已预订的座位
      }
    }
  }
</script>

<style scoped>

</style>
