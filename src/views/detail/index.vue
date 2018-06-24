<template>
  <div v-loading="programDetailLoading">
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row>
          <BreadCrumb/>
        </el-row>
        <el-row>
          <Detail :program-detail="programDetail" ref="detail"/>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import Detail from './ticket/index'
  import { getProgramDetail } from "../../api/program";

  export default {
    name: 'detail',
    components: {
      BreadCrumb,
      Detail,
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
          pars: []
        }
      }
    },
    activated: function () {
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
      fulfillProgramDetail: function (detail) {
        this.programDetail.id = detail.id
        this.programDetail.title = detail.programName
        this.programDetail.posterSrc = detail.poster
        this.programDetail.time= detail.time
        this.programDetail.spot = detail.venueName
        this.programDetail.address = detail.address
        this.programDetail.viewNum = detail.scanVolume
        this.programDetail.favoriteNum = detail.favoriteVolume
        this.programDetail.fields = detail.fields
        this.programDetail.pars = detail.parIDs

        this.$refs.detail.initDefaultFieldAndParAndBuyNum(this.programDetail.fields, this.programDetail.pars)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
