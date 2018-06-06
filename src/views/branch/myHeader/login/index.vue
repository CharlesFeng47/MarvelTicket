<template>
  <span class="dialog">
  <el-button type="text" @click="centerDialogVisible = true">登录/注册</el-button>

  <el-dialog
    title="欢迎来到MarvelTicket"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <div style="text-align: center">
     <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" class="loginForm">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱" auto-complete="on"></el-input>
        </el-form-item>
       <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
     </el-form>
    </div>
  </el-dialog>
  </span>
</template>

<script>
  export default {
    name: 'login-panel',
    data: function() {
      var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!reg.test(value)) {
          callback(new Error('邮箱的格式错误'))
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
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
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
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
    .loginForm {
      .el-form-item__content {
        margin-left: 20%;
        margin-right: 20%;
      }
      input {
        /*box-sizing: content-box;*/
        /*width: 80%;*/
        height: 34px;
        padding: 0 15px;
        border: 1px solid #f7f7f7;
        line-height: 38px;
        color: #3c3c3c;
        border-radius: 8px;
        background: #f7f7f7;
      }
      button{
        width: 100%;
        height: 40px;
        text-align: center;
        color: #fff;
        margin-bottom: 30px;
        font-size: 18px;
        line-height: 40px;
        background-image: linear-gradient(-243deg,#ff4732 0,#e33c6d 100%);
        border-radius: 20px;
      }
    }

  .dialog {
    .el-dialog {
      border-radius: 8px;
    }
  }
</style>

