<template>
  <div v-loading="consumptionLoading">
    <h1>交易记录</h1>

    <el-row>
      <el-col :offset="2">
        <el-table :data="allConsumptions" style="width: 800px" stripe>
          <el-table-column
            align="center"
            prop="mid"
            label="会员"
            width="200">
          </el-table-column>
          <el-table-column
            align="center"
            prop="spotName"
            label="场馆名称"
            width="300">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="消费记录类型"
            width="150"
            :filters="[{ text: '预订', value: '预订' }, { text: '退订', value: '退订' }]"
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
            prop="price"
            label="金额"
            width="150">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getConsumption } from '../../api/statistics'

  export default {
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      return {
        allConsumptions: [],

        consumptionLoading: true
      }
    },
    mounted: function() {
      new Promise((resolve, reject) => {
        getConsumption(this.token).then(response => {
          if (response.state === 'OK') {
            this.allConsumptions = JSON.parse(response.object)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.consumptionLoading = false
      }).catch(() => {
        this.consumptionLoading = false
      })
    },
    methods: {
      filterType(value, row) {
        console.log('filterType')
        return row.type === value
      }
    }
  }
</script>

<style scoped>

</style>
