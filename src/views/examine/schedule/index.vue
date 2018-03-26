<template>
  <div>
    <h1>计划结算</h1>

    <el-row>
      <el-col :offset="2">
        <el-table :data="allSchedules" style="width: 1000px" stripe>
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
            prop="state"
            label="状态"
            width="88"
            :filters="[{ text: '已发布', value: '已发布' }, { text: '已结束', value: '已结束' }, { text: '已结算', value: '已结算' }]"
            :filter-method="filterState"
            filter-placement="right-start">
            <template slot-scope="scope">
              <el-tag
                type="danger"
                close-transition>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="balance"
            label="结算金额"
            width="250">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.state!=='已结束'" size="mini" @click="settleBalance(scope.$index, scope.row)">结算</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { getAllAllSchedules, settleSchedule } from '../../../api/schedule'

  export default {
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        allSchedules: []
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getAllAllSchedules().then(response => {
          if (response.state === 'OK') {
            const allSchedules = JSON.parse(response.object)
            this.prepareReadyData(allSchedules)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
      }).catch(() => {
      })
    },
    methods: {
      filterType(value, row) {
        console.log('filterType')
        return row.type === value
      },
      filterState(value, row) {
        console.log('filterState')
        return row.state === value
      },

      // 从后端取得值之后填充到data中
      prepareReadyData(data) {
        var allSchedulesNew = []
        for (var i = 0; i < data.length; i++) {
          allSchedulesNew[i] = {}
          allSchedulesNew[i].id = data[i].id
          allSchedulesNew[i].scheduleName = data[i].name
          allSchedulesNew[i].spotName = data[i].spotName
          allSchedulesNew[i].type = data[i].type
          allSchedulesNew[i].state = data[i].state
          allSchedulesNew[i].balance = data[i].balance
        }
        this.allSchedules = allSchedulesNew
      },

      settleBalance(index, row) {
        new Promise((resolve, reject) => {
          settleSchedule(this.token, row.id).then(response => {
            if (response.state === 'OK') {
              Message({
                message: '结算成功！',
                type: 'success',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
            } else if (response.state === 'SCHEDULE_NOT_SEETLABLE') {
              Message({
                message: '当前计划不可结算！',
                type: 'error',
                duration: 3 * 1000,
                center: true,
                showClose: true
              })
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          // 界面修改元素
          var rowNew = row
          rowNew.state = '已结算'
          this.allSchedules.splice(index, 1, rowNew)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
