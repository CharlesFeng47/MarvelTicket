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

  // 用户选择座位
  export default {
    name: 'MemberChoose',
    props: ['scheduleDetail'],
    computed: {
      ...mapGetters([
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
    // 因为created/mounted的时候scheduleDetail可能还没取到，所以watch取到之后再添加
    watch: {
      scheduleDetail: function() {
        this.getSeatMapData()
      }
    },
    methods: {
      getSeatMapData() {
        // TODO seatMap 格式与标注已预订与 this.seatChartInit() 一起考虑
        console.log('getSeatMapData')
        this.seatMap = JSON.parse(this.scheduleDetail.remainSeatsJson)
        this.computeSeatLegendNames(this.scheduleDetail.seatNames)
        this.computeSeatPrices()
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

      // 填充seatPrices，并根据seatLegendItems把seat初始化的category补齐，填充之后再初始化 seat chart
      computeSeatPrices() {
        const allPrices = this.scheduleDetail.allrices

        // 把其他项也补齐0
        const allPricesLength = allPrices.length
        for (var i = allPricesLength; i < 9; i++) {
          allPrices[i] = 0
        }
        this.seatPrices = allPrices

        var categories = []
        for (var k = 0; k < this.seatLegendItems.length; k++) {
          categories[k] = this.seatLegendItems[k][2]
        }
        for (var j = this.seatLegendItems.length - 1; j < 9; j++) {
          categories[j] = ''
        }

        this.seatChartInit(categories)
      },

      seatChartInit(categories) {
        var _this = this
        // 需要先将之前的内容给清空，不然不会重新生成
        $('#seat-member-choose').html('<div id="seat-map">\n' +
          '          <div class="front-indicator">Front</div>\n' +
          '        </div>')
        $('#seat-map').seatCharts({
          map: _this.seatMap,
          seats: {
            a: {
              price: _this.seatPrices[0],
              classes: 'a-class',
              category: categories[0]

            },
            b: {
              price: _this.seatPrices[1],
              classes: 'b-class',
              category: categories[1]
            },
            c: {
              price: _this.seatPrices[2],
              classes: 'c-class',
              category: categories[2]
            },
            d: {
              price: _this.seatPrices[3],
              classes: 'd-class',
              category: categories[3]
            },
            e: {
              price: _this.seatPrices[4],
              classes: 'e-class',
              category: categories[4]
            },
            f: {
              price: _this.seatPrices[5],
              classes: 'f-class',
              category: categories[5]
            },
            g: {
              price: _this.seatPrices[6],
              classes: 'g-class',
              category: categories[6]
            },
            h: {
              price: _this.seatPrices[7],
              classes: 'h-class',
              category: categories[7]
            },
            i: {
              price: _this.seatPrices[8],
              classes: 'i-class',
              category: categories[8]
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
            console.log(this.data().price + '   ' + this.data().category)
            if (this.status() === 'available') {
              // 选座不超过6个
              if (_this.chooseSeatsCount < 6) {
                _this.chooseSeats[_this.chooseSeatsCount] = this
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

              const thisId = this.settings.id
              // 先找到此座位在列表中存储的序号
              var needToDeleteIndex
              for (var curIndex in _this.chooseSeats) {
                if (_this.chooseSeats[curIndex].settings.id === thisId) {
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
      },

      // 给父组件 newOrder/step1 提供的，将参数保存到store中的方法
      validateData() {
        if (this.chooseSeatsCount === 0) {
          Message({
            message: '选座购买至少需要购买 1 张票哦～',
            type: 'error',
            duration: 3 * 1000,
            center: true,
            showClose: true
          })
        } else {
          this.storeMemberChooseData()
        }
      },

      storeMemberChooseData() {
        var totalPrice = 0
        for (var i = 0; i < this.chooseSeatsCount; i++) {
          totalPrice += this.chooseSeats[i].data().price
        }

        this.$store.dispatch('StoreMemberChooseSeats', {
          choose_seats: this.chooseSeats,
          choose_seats_count: this.chooseSeatsCount,
          order_price: totalPrice
        }).then(() => {
          this.$emit('next')
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
