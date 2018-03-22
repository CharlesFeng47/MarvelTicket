<template>
  <div>
    <el-row type="flex" justify="space-around" style="margin-top: 100px">
      <el-col :span="8">
        <el-form :model="memberModifyForm" :rules="memberModifyFormRules" ref="memberModifyForm" label-width="100px">
          <el-form-item label="密码" prop="pwd" style="margin-top: 30px">
            <el-input v-model="memberModifyForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="pwdConfirm" style="margin-top: 30px">
            <el-input v-model="memberModifyForm.pwdConfirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleMemberModify">
              确认修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { memberModify } from '../../../api/user'

  export default {
    name: 'MemberModify',
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码不能少于 6 位'))
        } else {
          callback()
        }
      }
      const validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码不能少于 6 位'))
        } else if (value !== this.memberModifyForm.pwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }

      return {
        memberModifyForm: {
          pwd: '',
          pwdConfirm: ''
        },

        memberModifyFormRules: {
          pwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
          pwdConfirm: [{ required: true, trigger: 'blur', validator: validatePassword2 }]
        }
      }
    },
    methods: {
      handleMemberModify() {
        this.$refs.memberModifyForm.validate(valid => {
          if (valid) {
            console.log('member modify')

            new Promise((resolve, reject) => {
              memberModify(this.token, this.memberModifyForm.pwd).then(response => {
                if (response.state === 'OK') {
                  Message({
                    message: '密码修改成功！',
                    type: 'success',
                    duration: 3 * 1000,
                    center: true,
                    showClose: true
                  })
                  this.$router.push('/user_info')
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).then(() => {
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
