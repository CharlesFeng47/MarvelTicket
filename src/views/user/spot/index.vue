<template>
  <div>
    <h1>{{ spotBasic.name }}</h1>

    <!--基本信息-->
    <el-row class="basic_info">
      <el-col :span="4">
        <el-col :span="8">
          <h3>编号ID</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="primary" class="basic_content">{{ spotBasic.id }}</el-tag>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="8">
          <h3>密码</h3>
        </el-col>
        <el-col :span="8">
          <el-tag type="warning" class="basic_content">{{ spotBasic.password }}</el-tag>
        </el-col>
      </el-col>
    </el-row>

    <!--地址-->
    <el-row class="basic_info">
      <el-col :span="1">
        <h3>地址</h3>
      </el-col>
      <el-col :span="23">
        <!--<el-tag type="info" class="basic_content">{{ textArea }}</el-tag>-->
        <el-input type="textarea" autosize disabled v-model="spotBasic.site" style="margin-top: 13px"></el-input>
      </el-col>
    </el-row>

    <!--座位名称数量对比-->
    <el-row class="basic_info">
      <el-col :span="2">
        <h3>坐席价位</h3>
      </el-col>
    </el-row>
    <el-row class="basic_info" type="flex" justify="space-around">
      <el-col :offset="2">
        <el-table :data="seatNameNumMap" style="width: 500px" stripe>
          <el-table-column
            v-for="{ prop, label } in colConfigs"
            align="center"
            :key="prop"
            :prop="prop"
            :label="label">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-row class="basic_info">
      <!--座位图-->
      <SeatChartDisplayOnly ref="SeatChart"></SeatChartDisplayOnly>
    </el-row>

  </div>
</template>

<script>
  import SeatChartDisplayOnly from '../../seatChart/displayOnly'
  import { mapGetters } from 'vuex'
  import { getUser } from '../../../api/user'
  import { computeSeatNameNumMap } from '../../../utils/seat_chart_helper'

  export default {
    name: 'SpotInfo',
    props: ['isNew'],
    components: {
      SeatChartDisplayOnly
    },
    computed: {
      ...mapGetters([
        'token',
        'spot_basic',
        'spot_seats_map',
        'cur_seat_type_count',
        'seat_names'
      ])
    },
    data() {
      this.colConfigs = [
        { prop: 'seatName', label: '坐席名称' },
        { prop: 'num', label: '坐席数量' }
      ]
      return {
        spotBasic: {
          id: '注册后自动生成哦',
          name: '',
          password: '',
          site: ''
        },
        seatNameNumMap: []
      }
    },
    mounted: function() {
      if (this.isNew === 'false') {
        // 不是新的，从后端加载数据
        console.log('to fetch')
        this.fetchData()
      } else {
        // 新计划预览，从store中加载数据
        console.log('to fulfill')
        this.fulfillData()
      }
    },
    methods: {
      // 【提供给父组件中button调用】修改用户数据，跳转页面
      goToModify() {
        this.$router.push('/user_info/modify_spot')
      },
      // 后端得值
      fetchData() {
        new Promise((resolve, reject) => {
          getUser(this.token).then(response => {
            console.log(response)
            if (response.state === 'OK') {
              const curSpot = JSON.parse(response.object)
              console.log(curSpot)

              this.spotBasic.id = curSpot.id
              this.spotBasic.name = curSpot.spotName
              this.spotBasic.password = curSpot.pwd
              this.spotBasic.site = curSpot.site
              this.seatNameNumMap = curSpot.seatInfos
              const curSeatNames = this.convertToSeatNames(curSpot.seatInfos, curSpot.curSeatTypeCount)

              console.log('allSeatsJson')
              console.log(curSpot.allSeatsJson)

              this.$store.dispatch('ChangeSpotBasicInfo', this.spotBasic).then(() => {
                this.$store.dispatch('ChangeSpotSeatsMap', {
                  spot_seats_map: JSON.parse(curSpot.allSeatsJson),
                  cur_seat_type_count: curSpot.curSeatTypeCount,
                  seat_names: curSeatNames
                }).then(() => {
                  resolve()
                }).catch(() => {
                })
              }).catch(() => {
              })
            }
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      // 填充store里面的值
      fulfillData() {
        this.spotBasic.name = this.spot_basic.name
        this.spotBasic.password = this.spot_basic.password
        this.spotBasic.site = this.spot_basic.site
        this.seatNameNumMap = computeSeatNameNumMap(this.cur_seat_type_count, this.spot_seats_map, this.seat_names)
      },
      // 从后端的seatInfos得到数据seat_names填充到store
      convertToSeatNames(seatInfos, curSeatTypeCount) {
        var seatNames = {}
        for (var i = 0; i < curSeatTypeCount; i++) {
          switch (i) {
            case 0:
              seatNames.aName = seatInfos[i].seatName
              break
            case 1:
              seatNames.bName = seatInfos[i].seatName
              break
            case 2:
              seatNames.cName = seatInfos[i].seatName
              break
            case 3:
              seatNames.dName = seatInfos[i].seatName
              break
            case 4:
              seatNames.eName = seatInfos[i].seatName
              break
            case 5:
              seatNames.fName = seatInfos[i].seatName
              break
            case 6:
              seatNames.gName = seatInfos[i].seatName
              break
            case 7:
              seatNames.hName = seatInfos[i].seatName
              break
            case 8:
              seatNames.iName = seatInfos[i].seatName
              break
          }
        }
        return seatNames
      }
    }
  }
</script>

<style scoped>
  .basic_info {
    margin: 5px;
  }

  .basic_content {
    margin-top: 12px;
  }
</style>
