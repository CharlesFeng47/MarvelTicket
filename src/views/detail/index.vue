<template>
  <div v-loading="programDetailLoading">
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row>
          <BreadCrumb :program-detail="programDetail"/>
        </el-row>
        <el-row>
          <TicketDetail :program-detail="programDetail" ref="detail" @changeStar="changeStar" @generateOrder="generateOrder"/>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import TicketDetail from './ticket/index'
  import { getProgramDetail } from '../../api/program'
  import { star } from '../../api/user'
  export default {
    name: 'detail',
    components: {
      BreadCrumb,
      TicketDetail
    },
    data() {
      return {
        programDetailLoading: false,
        programDetail: {
          id: '',
          title: '',
          posterSrc: '',
          // saleType: '',
          time: '',
          spot: '',
          viewNum: '',
          favoriteNum: '',
          // 场次
          fields: [],
          // 票面
          pars: [],
          star: false
        }
      }
    },
    activated: function() {
      this.programDetailLoading = true
      new Promise((resolve, reject) => {
        getProgramDetail(this.$route.params.programId).then(response => {
          if (response.state === 'OK') {
            const detail = JSON.parse(response.object)
            this.fulfillProgramDetail(detail)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).then(() => {
        this.programDetailLoading = false
      }).catch(() => {
        this.programDetailLoading = false
      })
    },
    methods: {
      fulfillProgramDetail: function(detail) {
        // console.log(detail)
        this.programDetail.id = detail.id
        this.programDetail.typeEnum = detail.programType
        this.programDetail.title = detail.programName
        this.programDetail.posterSrc = detail.imageUrl
        this.programDetail.time = detail.time
        this.programDetail.spot = detail.venueName
        this.programDetail.address = detail.address
        this.programDetail.viewNum = detail.scanVolume
        this.programDetail.favoriteNum = detail.favoriteVolume
        this.programDetail.fields = detail.fields
        this.programDetail.pars = detail.parIDs
        // this.programDetail.star = true
        this.programDetail.star = detail.like

        // 初始化默认的票面选择
        this.$refs.detail.initDefaultFieldAndParAndBuyNum(this.programDetail.fields, this.programDetail.pars)
      },
      changeStar: function() {
        // this.programDetail.star = !this.programDetail.star
        console.log(this.programDetail.id)
        new Promise((resolve, reject) => {
          star(this.programDetail.id).then(response => {
            if (response.state === 'OK') {
              this.programDetail.star = true
              this.programDetail.favoriteNum++
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      // 生成订单之前的信息，保存在orderDetaill中
      generateOrder(order) {
        order.id = this.programDetail.id
        order.programName = this.programDetail.title
        order.typeEnum = this.programDetail.typeEnum
        order.posterSrc = this.programDetail.posterSrc
        order.programTime = this.programDetail.time
        order.spot = this.programDetail.spot
        order.address = this.programDetail.address
        // this.programDetail.fields = detail.fields
        for (var i in this.programDetail.pars) {
          // console.log(par)
          if (this.programDetail.pars[i].seatType === order.seatType) {
            order.par = this.programDetail.pars[i]
          }
        }
        // 将order信息保存到store
        // console.log(order)
        this.$store.dispatch('StoreOrderDetail', {
          order_detail: order
        }).then(() => {
          this.$router.push('/orderConfirm')
        }).catch(() => {
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
