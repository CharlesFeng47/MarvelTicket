<template>
  <span class="dialog">
  <el-button type="text" @click="centerDialogVisible = true">登录/注册</el-button>

  <el-dialog
    title="欢迎来到MarvelTicket"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <div style="text-align: center">
     <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="loginForm">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }]"
        >
          <el-input v-model="loginForm.email" placeholder="邮箱" auto-complete="on"></el-input>
        </el-form-item>
       <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
     </el-form>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  </span>
</template>

<script>
  export default {
    name: 'login-panel',
    data: function() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        centerDialogVisible: false,
        loginForm: {
          email: '',
          pass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .loginForm{
    .el-form-item__content{
      margin-left: 10%;
      margin-right: 10%;
    }
      input{
         box-sizing: content-box;
         width: 80%;
         height: 38px;
         padding: 0 15px;
         border: 1px solid #f7f7f7;
         line-height: 38px;
         color: #3c3c3c;
         border-radius: 8px;
         background: #f7f7f7;
      }
  }
  .dialog{
    .el-dialog{
      border-radius: 8px;
    }
  }
</style>

