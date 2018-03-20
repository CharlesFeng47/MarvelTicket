<template>
  <div>
    <h1>所有订单</h1>

    <el-row>
      <el-col :offset="2">
        <el-table :data="allOrderBriefs" style="width: 1000px" stripe>
          <!--不加载订单ID-->
          <el-table-column v-if="false"
                           prop="id"
                           label="订单Id"
                           width="0">
          </el-table-column>
          <el-table-column
            align="center"
            prop="scheduleName"
            label="计划名称"
            width="400">
          </el-table-column>
          <el-table-column
            align="center"
            prop="orderState"
            label="订单状态"
            width="100">
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
                close-transition>{{scope.row.startTime}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="totalPrice"
            label="价格"
            sortable
            width="150">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleCheck(scope.$index, scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getMyOrders } from '../../api/order'

  // 查看所有订单列表
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        allOrderBriefs: []
      }
    },
    mounted: function() {
      this.fetchMyData()
    },
    methods: {
      handleCheck(index, row) {
        this.$router.push('/order/' + row.id)
      },

      fetchMyData() {
        new Promise((resolve, reject) => {
          getMyOrders(this.name).then(response => {
            if (response.state === 'OK') {
              const orderBriefs = JSON.parse(response.object)
              this.changeData(orderBriefs)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      // 将取得的订单计划数据填充
      changeData(data) {
        var allOrderBriefsNew = []
        for (var i = 0; i < data.length; i++) {
          allOrderBriefsNew[i] = {}
          allOrderBriefsNew[i].id = data[i].id
          allOrderBriefsNew[i].scheduleName = data[i].name
          allOrderBriefsNew[i].orderState = data[i].orderState
          allOrderBriefsNew[i].startTime = data[i].startDateTime
          allOrderBriefsNew[i].totalPrice = data[i].totalPrice
        }
        this.allOrderBriefs = allOrderBriefsNew
      }
    }
  }
</script>

<style scoped>

</style>
