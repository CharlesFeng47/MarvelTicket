<template>
  <div v-loading="programDetailLoading">
    <el-row>
      <el-col :offset="3" :span="18">
        <el-row>
          <BreadCrumb :program-detail="programDetail"/>
        </el-row>
        <el-row>
          <TicketDetail :program-detail="programDetail" ref="detail" @changeStar="changeStar"/>
        </el-row>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BreadCrumb from '../../components/MyBreadCrumb/index'
  import TicketDetail from './ticket/index'
  import { getProgramDetail, hasStarredCurProgram } from '../../api/program'
  import { star, cancelStar } from '../../api/user'
  import { mapGetters } from 'vuex'

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
          typeEnum: '',
          title: '',
          posterSrc: '',
          // saleType: '',
          time: '',
          spot: '',
          address: '',
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
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    activated: function() {
      // 获取当前节目的详情
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


      // 查看当前已登录用户是否已经收藏过该节目
      if (this.token !== undefined && this.token !== '') {
        new Promise((resolve, reject) => {
          hasStarredCurProgram(this.$route.params.programId, this.token).then(response => {
            if (response.state === 'OK') {
              const hasStarred = JSON.parse(response.object)
              this.programDetail.star = hasStarred
              console.log(hasLiked)
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
      }
    },
    methods: {
      fulfillProgramDetail: function(detail) {
        console.log(detail)
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

        // 初始化默认的票面选择
        this.$refs.detail.initDefaultFieldAndParAndBuyNum(this.programDetail.fields, this.programDetail.pars)
      },

      // 由子组件调用，改变收藏状态
      changeStar: function() {
        // this.programDetail.star = !this.programDetail.star
        console.log(this.programDetail.id)

        if (this.programDetail.star) {
          new Promise((resolve, reject) => {
            cancelStar(this.programDetail.id, this.token).then(response => {
              if (response.state === 'OK') {
                this.programDetail.star = false
                this.programDetail.favoriteNum--
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).then(() => {
          }).catch(() => {
          })
        } else {
          new Promise((resolve, reject) => {
            star(this.programDetail.id, this.token).then(response => {
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
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
