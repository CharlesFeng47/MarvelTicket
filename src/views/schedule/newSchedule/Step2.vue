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
  import { validatNumbers } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'step2',
    props: ['curStep'],
    computed: {
      ...mapGetters([
        'seat_price_map'
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
          if (!validatNumbers(this.seatPriceMap[i].seatPrice)) {
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
      }
    },
    mounted: function() {
      console.log('seat_price_map mounted')
      const storedMapLength = this.seat_price_map.length
      for (var i = 0; i < storedMapLength; i++) {
        var entry = this.seat_price_map[i]
        this.seatPriceMap[i] = {}
        this.seatPriceMap[i].seatName = entry.seatName
        this.seatPriceMap[i].seatNum = entry.seatNum
        this.seatPriceMap[i].seatPrice = entry.seatPrice
      }
    }
  }
</script>

<style scoped>

</style>
