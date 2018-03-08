<template>
    <div>
      <h1>{{ curStep }}</h1>
      <!--座位价格映射-->
      <el-row>
        <el-col :span="2">
          <h3>坐席价位</h3>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :offset="2">
          <el-table :data="seatPriceMap" style="width: 500px" stripe>
            <el-table-column
              align="center"
              prop="seatName"
              label="坐席名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="seatNum"
              label="坐席数量">
            </el-table-column>
            <el-table-column
              align="center"
              label="此次价格"
              width="200px">
              <template slot-scope="scope">
                <el-input placeholder="请输入价格" v-model="scope.row.seatPrice">
                  <template slot="append">元</template>
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { isValidatNumbers } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getUser } from '../../../api/user'
  import { getSchedule } from '../../../api/schedule'

  export default {
    name: 'step2',
    props: ['curStep'],
    computed: {
      ...mapGetters([
        'token',
        'seat_price_map',
        'seat_price_map_modified'
      ])
    },
    data() {
      return {
        seatPriceMap: []
      }
    },
    methods: {
      // 检验数据可靠性
      validateData() {
        var numbersIsValidate = true
        for (var i = 0; i < this.seatPriceMap.length; i++) {
          if (!isValidatNumbers(this.seatPriceMap[i].seatPrice)) {
            numbersIsValidate = false
          }
        }

        if (numbersIsValidate) {
          this.$store.dispatch('ChangeSeatPriceMap', this.seatPriceMap).then(() => {
          }).catch(() => {
          })
          this.$emit('next')
        } else {
          alert('数据不合法')
        }
      },
      // 重置价格
      resetData() {
        var mapNew = []
        const storedMapLength = this.seat_price_map.length
        for (var i = 0; i < storedMapLength; i++) {
          var entry = this.seat_price_map[i]
          mapNew[i] = {}
          mapNew[i].seatName = entry.seatName
          mapNew[i].seatNum = entry.seatNum
          mapNew[i].seatPrice = ''
        }
        this.seatPriceMap = mapNew
      },
      // 页面的默认值
      fetchDefaultData() {
        if (this.$route.meta.isNew) {
          // 新建的计划，向后端发出请求获取此场馆的座位信息初始化store
          new Promise((resolve, reject) => {
            getUser(this.token).then(response => {
              console.log(response)
              if (response.state === 'OK') {
                const curSpot = JSON.parse(response.object)

                var seatMapForPrice = []
                var curSpotSeats = curSpot.seatInfos
                for (var i = 0; i < curSpotSeats.length; i++) {
                  var curSeat = curSpotSeats[i]
                  seatMapForPrice[i] = {}
                  seatMapForPrice[i].seatName = curSeat.seatName
                  seatMapForPrice[i].seatNum = curSeat.num
                  seatMapForPrice[i].seatPrice = ''
                }

                this.$store.dispatch('ChangeSeatPriceMap', seatMapForPrice).then(() => {
                  this.fulfillStoredData()
                }).catch(() => {
                })
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
          }).catch(() => {
          })
        } else {
          // 是修改已存在的计划，获得内容后自动填充
          new Promise((resolve, reject) => {
            getSchedule(this.$route.params.scheduleId).then(response => {
              console.log(response)
              if (response.state === 'OK') {
                const scheduleDetail = JSON.parse(response.object)
                var seatPriceMapNew = []
                var all_prices = scheduleDetail.all_prices
                var all_seats = scheduleDetail.all_seats
                for (var i = 0; i < all_prices.length; i++) {
                  seatPriceMapNew[i] = {}
                  seatPriceMapNew[i].seatPrice = all_prices[i]
                  seatPriceMapNew[i].seatName = all_seats[i].seatName
                  seatPriceMapNew[i].seatNum = all_seats[i].num
                }
                this.$store.dispatch('ChangeSeatPriceMap', seatPriceMapNew).then(() => {
                  this.fulfillStoredData()
                }).catch(() => {
                })
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
          }).catch(() => {
          })
        }
      },
      // 填充store里面的值
      fulfillStoredData() {
        var seatPriceMapNew = []
        const storedMapLength = this.seat_price_map.length
        for (var i = 0; i < storedMapLength; i++) {
          var entry = this.seat_price_map[i]
          seatPriceMapNew[i] = {}
          seatPriceMapNew[i].seatName = entry.seatName
          seatPriceMapNew[i].seatNum = entry.seatNum
          seatPriceMapNew[i].seatPrice = entry.seatPrice
        }
        this.seatPriceMap = seatPriceMapNew
      }
    },
    mounted: function() {
      console.log('seat_price_map mounted: seatPriceMap-----')
      if (!this.seat_price_map_modified) {
        console.log('step2 第一次，加载数据')
        this.fetchDefaultData()
      } else {
        console.log('step2 已修改过数据，从store中加载数据')
        this.fulfillStoredData()
      }
    // },
    // beforeRouteEnter: function(to, from, next) {
    //   const fromUrl = from.fullPath
    //   if (fromUrl.indexOf('step1') >= 0) {
    //     next()
    //   } else {
    //     if (fromUrl.indexOf('modify') >= 0) {
    //       const modifyPos = fromUrl.indexOf('modify')
    //       const temp = fromUrl.substr(modifyPos + 7)
    //       const idLastIndex = temp.indexOf('/')
    //       if (idLastIndex) {
    //         next('schedule/modify/' + temp.substr(0, idLastIndex))
    //       } else {
    //         next('schedule/modify/' + temp)
    //       }
    //     }
    //     if (fromUrl.indexOf('new_schedule') >= 0) {
    //       next('schedule/new_schedule')
    //     }
    //   }
    }
  }
</script>

<style scoped>

</style>
