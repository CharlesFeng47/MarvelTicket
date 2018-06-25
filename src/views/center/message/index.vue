<template>
  <div class="message-panel">
    <el-row>
      <template v-if="!modifyPortrait">
        <el-col :span="24">
          <div class="portrait" @click="modifyMyPortrait">
            <img :src="message.portrait"/>
          </div>
        </el-col>
      </template>
      <template v-else>
        <div class="upload-portrait">
          <el-upload
            class="avatar-uploader"
            action=""
            drag
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handlePreview">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖拽，或<em>点击上传</em></div>
          </el-upload>
          <el-row>
            <el-col :span="10" :offset="0" class="button-block-sm">
              <el-button type="info" @click="cancelModifyPortrait">取消修改</el-button>
            </el-col>
            <el-col :span="10" :offset="2" class="button-block-sm">
              <el-button :disabled="!preUpload" type="danger" @click="sureModifyPortrait">保存修改</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-row>
    <el-row class="line">
      <el-col :span="6">
        <span class="label">邮箱：</span>
      </el-col>
      <el-col :span="18">
        <span class="message">{{ message.email }}</span>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="6">
        <span class="label">昵称：</span>
      </el-col>
      <template  v-if="!modifyName">
        <el-col :span="10">
          <span class="message">{{ message.name }}</span>
        </el-col>
        <el-col :span="6" class="button-block">
          <el-button type="danger" @click="modifyMyName" style="margin-top: -10px;">修改昵称</el-button>
        </el-col>
      </template>
      <template v-else>
        <el-col :span="15" >
          <el-form :model="nameForm" status-icon :rules="rules2" ref="nameForm" label-width="0px" style="margin-top: -10px" >
            <el-form-item prop="username">
              <el-input v-model="nameForm.username" placeholder="请输入昵称"  auto-complete="on" :autofocus="true" style="margin-top: -14px"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="5" :offset="6" class="button-block">
          <el-button type="info" @click="cancelModifyName">取消修改</el-button>
        </el-col>
        <el-col :span="5" :offset="1" class="button-block">
          <el-button type="danger" @click="sureModifyName">保存修改</el-button>
        </el-col>
      </template>
    </el-row>
    <el-row class="line">
      <el-col :span="6">
        <span class="label">密码：</span>
      </el-col>
      <template  v-if="!modifyPassword">
        <el-col :span="10">
          <div class="message" style="margin-top: 5px">**********</div>
        </el-col>
        <el-col :span="6" class="button-block">
          <el-button type="danger" @click="modifyMyPassword" style="margin-top: -10px;">修改密码</el-button>
        </el-col>
      </template>
      <template  v-else>
        <el-col :span="15">
        <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="0px" style="margin-top: -10px">
          <el-form-item prop="old_password">
            <el-input placeholder="请输入旧密码"  type="password"  v-model="passwordForm.old_password"/>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input  placeholder="请输入新密码" type="password" v-model="passwordForm.pass" auto-complete="on"/>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input  placeholder="请再次输入新密码" type="password" v-model="passwordForm.checkPass" auto-complete="on"/>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="10" :offset="0" class="button-block">
                <el-button type="info" @click="cancelModifyPassword">取消修改</el-button>
              </el-col>
              <el-col :span="10" :offset="2" class="button-block">
                <el-button type="danger" @click="sureModifyPassword">保存修改</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isValidUsername } from '@/utils/validate'
  import { modifyName,modifyPassword,modifyPortrait } from '../../../api/user'
  export default {
    name: 'message',
    components: {},
    data: function () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码错误'));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.pass) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }
      const validateUsername = (rule, value, callback) => {
        if (!isValidUsername(value)) {
          callback(new Error('请输入正确的会员名'))
        } else {
          callback()
        }
      }
      return {
        modifyName: false,
        modifyPassword: false,
        modifyPortrait: false,
        preUpload: false,
        imageUrl: '',
        passwordForm: {
          old_password: '',
          pass: '',
          checkPass: ''
        },
        nameForm: {
          username: ''
        },
        rules: {
          old_password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        rules2: {
          username: [
            {validator: validateUsername, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'message',
        'token'
      ])
    },
    watch: {},
    methods: {
      modifyMyPortrait() {
        this.modifyPortrait = true
        this.preUpload = false
      },
      cancelModifyPortrait() {
        this.modifyPortrait = false
        this.preUpload = true
        this.imageUrl = ''
      },
      sureModifyPortrait() {
        new Promise((resolve, reject) => {
          modifyPortrait(this.imageUrl, this.token).then(response => {
            if (response.state === 'OK') {
              this.modifyPortrait = false
              this.preUpload = true
              this.message.portrait = this.imageUrl
              // this.portrait = this.imageUrl
              this.$store.dispatch('SetMessage', {
                message: this.message
              }).then(() => {
              }).catch(() => {
              })

            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
        }).catch(() => {
        })
      },
      modifyMyName() {
        this.modifyName = true
        this.nameForm.username = this.message.name
      },
      cancelModifyName() {
        this.modifyName = false
      },
      sureModifyName() {
        this.$refs['nameForm'].validate((valid) => {
          if (valid) {
            new Promise((resolve, reject) => {
              modifyName(this.nameForm.username, this.token).then(response => {
                if (response.state === 'OK') {
                  this.message.name = this.nameForm.username
                  this.modifyName = false
                  // this.$store.dispatch('SetMessage', {
                  //   message: this.message
                  // }).then(() => {
                  //   // alert(this.message.name)
                  // }).catch(() => {
                  // })
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).then(() => {
            }).catch(() => {
            })
          } else {
            return false;
          }
        });
      },
      modifyMyPassword() {
        this.modifyPassword = true
        this.passwordForm.old_password = ''
        this.passwordForm.pass = ''
        this.passwordForm.checkPass = ''
      },
      cancelModifyPassword() {
        this.modifyPassword = false
      },
      sureModifyPassword() {
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            new Promise((resolve, reject) => {
              modifyPassword(this.passwordForm.pass, this.passwordForm.checkPass).then(response => {
                if (response.state === 'OK') {
                  this.modifyPassword = false
                }
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).then(() => {
            }).catch(() => {
            })
          } else {
            return false;
          }
        });

      },
      handlePreview(file) {
        // console.log(file)
        // console.log(URL.createObjectURL(file.raw))
        const isJPG = file.raw.type == 'image/jpeg';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;
        const isPNG = file.raw.type == 'image/png'
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        } else if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        } else {
          this.preUpload = true
          // this.imageUrl = URL.createObjectURL(file.raw);
          var _this = this
          this.getBase64(URL.createObjectURL(file.raw)).then(function(base64){
            _this.imageUrl = base64
          },function(err){
            console.log(err);
          });
        }
      },
      getBase64(img) {//传入图片路径，返回base64
        function getBase64Image(img, width, height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
          var canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          return dataURL;
        }

        var image = new Image();
        image.src = img;
        var deferred = $.Deferred();
        if (img) {
          image.onload = function () {
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
          }
          return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .message-panel {
    /*text-align: center;*/
    border: #EFEFEF solid 1px;
    padding: 10px 35% 50px 35%;
    margin: 0px;
    .portrait{
      width: 180px;
      height: 180px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      :hover{
        cursor: pointer;
      }
    }
    .line{
      margin-top: 50px;
      .el-button--danger{
        border-radius: 30px;
        width: 50px;
        height: 30px ;
      }
      .button-block {
        width:80px;
        /*margin: 0px;*/
        button {
          width: 100%;
          /*margin-bottom: 3px;*/
          border-radius: 16px;
          height: 32px;
          padding: 0;
        }
      }

      .el-form-item__content{
        margin-left: 0px !important;
      }
    }
    .upload-portrait {
      .button-block-sm {
        width: 45%;
        /*margin: 0px;*/
        button {
          width: 100%;
          /*margin-bottom: 3px;*/
          border-radius: 16px;
          height: 32px;
          padding: 0;
        }
      }
      padding:0px 50px 0px 50px;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        width: 178px;
        .el-upload-dragger{
          width: 100%;
        }
        /*position: relative;*/
        /*overflow: hidden;*/
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
