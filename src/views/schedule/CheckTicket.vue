<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-top: 150px">
      <el-col :span="8">
        <el-form :inline="true" :model="checkTicketForm" :rules="checkTicketFormRules" ref="checkTicketForm">
          <el-form-item label="订单号" prop="oid">
            <el-input v-model="checkTicketForm.oid" placeholder="请输入完整订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkTicket">检票登记</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { checkTicket } from '../../api/order'
  import { isValidateOrderId } from '../../utils/validate'

  export default {
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      const validateOrderId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入订单号'))
        } else if (!isValidateOrderId(value)) {
          callback(new Error('请输入合法订单号'))
        } else {
          callback()
        }
      }

      return {
        checkTicketFormRules: {
          oid: [{ required: true, trigger: 'blur', validator: validateOrderId }]
        },

        checkTicketForm: {
          oid: ''
        }
      }
    },
    methods: {
      checkTicket() {
        this.$refs.checkTicketForm.validate(valid => {
          if (valid) {
            console.log('check ticket')
            this.loading = true

            new Promise((resolve, reject) => {
              checkTicket(this.token, this.checkTicketForm.oid).then(response => {
                if (response.state === 'OK') {
                  Message({
                    message: '此订单已被成功检票！',
                    type: 'success',
                    duration: 3 * 1000,
                    center: true,
                    showClose: true
                  })
                  this.checkTicketForm.oid = ''
                } else {
                  var errorMsg = '位置错误，请联系管理员哦～'
                  if (response.state === 'TICKET_HAS_BEEN_CHECKED') {
                    errorMsg = '此订单已经被检票登记过了，请不要重复检票哦～'
                  } else if (response.state === 'TICKET_STATE_WRONG') {
                    errorMsg = '此订单不可被检票！'
                  } else if (response.state === 'TICKET_NOT_EXIST') {
                    errorMsg = '此订单编号不存在，请检查后重试！'
                  } else if (response.state === 'TICKET_CHECKER_WRONG') {
                    errorMsg = '此订单不属于您的场馆哦～您不能对此订单检票，请检查后重试！'
                  }
                  Message({
                    message: errorMsg,
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
              this.loading = false
            }).catch(() => {
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
