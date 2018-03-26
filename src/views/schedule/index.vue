<template>
  <div>
    <h1>所有计划</h1>

    <el-row>
      <el-col :offset="2">
        <el-table v-loading="schedulesLoading" :data="allScheduleBrief" style="width: 1000px" stripe>
          <!--不加载计划ID-->
          <el-table-column v-if="false"
            prop="id"
            label="计划Id"
            width="0">
          </el-table-column>
          <el-table-column
            align="center"
            prop="scheduleName"
            label="计划名称"
            width="230">
          </el-table-column>
          <el-table-column
            align="center"
            prop="spotName"
            label="举行场馆"
            width="250">
            <!--:formatter="formatter">-->
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="计划类型"
            width="100"
            :filters="[{ text: '音乐会', value: '音乐会' }, { text: '舞蹈', value: '舞蹈' }, { text: '话剧', value: '话剧' }, { text: '体育赛事', value: '体育赛事' }]"
            :filter-method="filterType"
            filter-placement="right-start">
            <template slot-scope="scope">
              <el-tag
                type="warning"
                close-transition>{{scope.row.type}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="startTime"
            label="预计开始时间"
            sortable
            width="180">
            <template slot-scope="scope">
              <el-tag
                type="danger"
                close-transition>{{scope.row.startTime}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
              <el-button v-if="roles[0] === 'SPOT'" size="mini" @click="buyTicketOnSpot(scope.$index, scope.row)">现场购票</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getAllSchedules, getSchedulesOfOneSpot } from '../../api/schedule'

  // 查看schedule列表的界面
  export default {
    name: 'schedule',
    data() {
      return {
        allScheduleBrief: [],
        schedulesLoading: true
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    mounted: function() {
      if (this.roles[0] === 'SPOT') {
        this.fetchDataOfOneSpot(this.name)
      } else {
        this.fetchAllData()
      }
    },
    methods: {
      formatter(row, column) {
        return row.spotName
      },
      filterType(value, row) {
        return row.type === value
      },
      // 查看计划详情
      handleCheck(index, row) {
        console.log(index, row)
        this.$router.push('/schedule/' + row.id)
      },
      // 场馆现场购票
      buyTicketOnSpot(index, row) {
        this.$router.push({
          path: '/order/buy_on_spot',
          query: {
            scheduleId: row.id
          }
        })
      },
      fetchAllData() {
        console.log('fetch all data')
        new Promise((resolve, reject) => {
          getAllSchedules().then(response => {
            if (response.state === 'OK') {
              const scheduleBrief = JSON.parse(response.object)
              this.changeData(scheduleBrief)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.schedulesLoading = false
        }).catch(() => {
        })
      },
      fetchDataOfOneSpot(spotId) {
        console.log('fetch data of one spot ' + spotId)
        new Promise((resolve, reject) => {
          getSchedulesOfOneSpot(spotId).then(response => {
            if (response.state === 'OK') {
              const scheduleBrief = JSON.parse(response.object)
              this.changeData(scheduleBrief)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.schedulesLoading = false
        }).catch(() => {
        })
      },
      // 将取得的日程计划数据填充
      // "[{"id":0,"name":"测试用日程名字","spotName":"重庆江北大剧院","startDateTime":"2018-02-28 23:30:48","type":"CONCERT"}]"
      changeData(data) {
        var allScheduleBriefNew = []
        for (var i = 0; i < data.length; i++) {
          allScheduleBriefNew[i] = {}
          allScheduleBriefNew[i].id = data[i].id
          allScheduleBriefNew[i].startTime = data[i].startDateTime
          allScheduleBriefNew[i].scheduleName = data[i].name
          allScheduleBriefNew[i].spotName = data[i].spotName
          allScheduleBriefNew[i].type = data[i].type
        }
        this.allScheduleBrief = allScheduleBriefNew
      }
    }
  }
</script>

<style scoped>

</style>
