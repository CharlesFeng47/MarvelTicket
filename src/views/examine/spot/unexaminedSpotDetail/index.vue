<template>
  <div>
    <SpotInfo ref="child" is-new="false" to-check="true"></SpotInfo>

    <el-row type="flex" justify="space-around" style="margin-top: 47px">
      <el-button @click.native.prevent="examineSpotPass" type="primary" round>审核通过</el-button>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { examineSpot } from '../../../../api/user'

  import SpotInfo from '../../../user/spot/index'

  export default {
    components: {
      SpotInfo
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    methods: {
      examineSpotPass() {
        new Promise((resolve, reject) => {
          examineSpot(this.token, this.$route.params.spotId).then(response => {
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
          this.$router.push('/examine/spot')
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
