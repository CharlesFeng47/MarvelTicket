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
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { getSpot } from '../../api/user'

  // 用户选座用的
  export default {
    name: 'MemberChoose',
    props: ['scheduleDetail'],
    computed: {
      ...mapGetters([
        'order_modified',
        'order_type',
        'choose_seats',
        'choose_seats_count'
      ])
    },
    data() {
      return {
        seatLegendItems: [],
        seatMap: '',

        // 座位的价格
        seatPrices: [],

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
              this.computeSeatPrices()
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      // 计算图例的数据，填充seatLegendItems
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

      // 填充seatPrices，填充之后再初始化 seat chart
      computeSeatPrices() {
        const allPrices = this.scheduleDetail.all_prices

        // 把其他项也补齐0
        const allPricesLength = allPrices.length
        for (var i = allPricesLength; i < 9; i++) {
          allPrices[i] = 0
        }
        this.seatPrices = allPrices
        this.seatChartInit()
      },

      seatChartInit() {
        var _this = this
        // 需要先将之前的内容给清空，不然不会重新生成
        $('#seat-member-choose').html('<div id="seat-map">\n' +
          '          <div class="front-indicator">Front</div>\n' +
          '        </div>')
        var sc = $('#seat-map').seatCharts({
          map: _this.seatMap,
          seats: {
            a: {
              price: _this.seatPrices[0],
              classes: 'a-class'
            },
            b: {
              price: _this.seatPrices[1],
              classes: 'b-class'
            },
            c: {
              price: _this.seatPrices[2],
              classes: 'c-class'
            },
            d: {
              price: _this.seatPrices[3],
              classes: 'd-class'
            },
            e: {
              price: _this.seatPrices[4],
              classes: 'e-class'
            },
            f: {
              price: _this.seatPrices[5],
              classes: 'f-class'
            },
            g: {
              price: _this.seatPrices[6],
              classes: 'g-class'
            },
            h: {
              price: _this.seatPrices[7],
              classes: 'h-class'
            },
            i: {
              price: _this.seatPrices[8],
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
            console.log(this.data().price)
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

        // 如果座位被修改过，还需加载修改的数据
        if (this.order_modified === true && this.order_type === 'CHOOSE_SEATS') {
          sc.get(this.choose_seats).status('selected')
          this.chooseSeats = this.choose_seats
          this.chooseSeatsCount = this.choose_seats_count
        }
      },

      // 给父组件 newOrder/step1 提供的，将参数保存到store中的方法
      storeMemberChooseData() {
        this.$store.dispatch('StoreMemberChooseSeats', {
          choose_seats: this.chooseSeats,
          choose_seats_count: this.chooseSeatsCount
        }).then(() => {
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
