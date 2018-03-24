<template>
  <div>
    <h1>场馆审批</h1>

    <el-row>
      <el-col :offset="2">
        <el-table :data="allUnexaminedSpots" style="width: 1000px" stripe>
          <!--不加载计划ID-->
          <el-table-column
            align="center"
            prop="id"
            label="场馆Id"
            width="88">
          </el-table-column>
          <el-table-column
            align="center"
            prop="spotName"
            label="场馆名称"
            width="230">
          </el-table-column>
          <el-table-column
            align="center"
            prop="site"
            label="场馆地址"
            width="230">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
            width="88">
            <template slot-scope="scope">
              <el-tag
                type="danger"
                close-transition>未审核</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" @click="examineSpotPass(scope.$index, scope.row)">审核通过</el-button>
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
  import { getUnexaminedSpots, examineSpot } from '../../../../api/user'

  //  查看所有未审批的场馆
  export default {
    data() {
      return {
        allUnexaminedSpots: []
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    mounted: function() {
      this.fetchAllSpotData()
    },
    methods: {
      // 查看计划详情
      handleCheck(index, row) {
        this.$router.push('/examine/spot/' + row.id)
      },
      examineSpotPass(index, row) {
        new Promise((resolve, reject) => {
          examineSpot(this.token, row.id).then(response => {
            if (response.state === 'OK') {
              Message({
                message: '审核该场馆成功！',
                type: 'success',
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
          // 界面移除该数据
          this.allUnexaminedSpots.splice(index, 1)
        }).catch(() => {
        })
      },

      fetchAllSpotData() {
        console.log('fetch all spot data')
        new Promise((resolve, reject) => {
          getUnexaminedSpots(this.token).then(response => {
            if (response.state === 'OK') {
              this.allUnexaminedSpots = JSON.parse(response.object)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
