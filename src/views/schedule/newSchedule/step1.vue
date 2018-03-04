<template>
  <div class="step1">
    <el-form :model="basicInfoForm" :rules="rules" ref="basicInfoForm" label-width="100px" class="basicInfoForm">
      <el-form-item label="计划名称" prop="name" style="margin-top: 30px">
        <el-input v-model="basicInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-radio-group v-model="basicInfoForm.type">
          <el-radio label="音乐会"></el-radio>
          <el-radio label="舞蹈"></el-radio>
          <el-radio label="话剧"></el-radio>
          <el-radio label="体育赛事"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="4">
          <el-form-item prop="date">
            <el-date-picker
              v-model="basicInfoForm.date"
              type="date"
              placeholder="请选择日期"
              :picker-options="datePickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1" >---</el-col>
        <el-col :span="4">
          <el-form-item prop="time">
            <el-time-picker
              v-model="basicInfoForm.time"
              type="fixed-time"
              placeholder="请选择时间">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <el-input type="textarea" v-model="basicInfoForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('basicInfoForm')">立即创建</el-button>
        <el-button @click="resetForm('basicInfoForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'step1',
    computed: {
      ...mapGetters([
        'basic_info_form'
      ])
    },
    data() {
      return {
        datePickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: '明天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: '三天后',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
                picker.$emit('pick', date)
              }
            },
            {
              text: '一周后',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        },
        basicInfoForm: {
          name: '',
          date: '',
          time: '',
          type: '',
          description: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 5, message: '名字需不少于 5 个字符', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          time: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      basicInfoForm: {
        handler(val, oldVal) {
          this.$store.dispatch('ChangeBasicInfo', this.basicInfoForm).then(() => {
          }).catch(() => {
          })
        },
        deep: true
      }
    },
    methods: {
      // 提交表单
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
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    mounted: function() {
      console.log('mounted')
      this.basicInfoForm.name = this.basic_info_form.name
      this.basicInfoForm.date = this.basic_info_form.date
      this.basicInfoForm.time = this.basic_info_form.time
      this.basicInfoForm.type = this.basic_info_form.type
      this.basicInfoForm.description = this.basic_info_form.description
    }
  }
</script>
<style>
  .step1 .basicInfoForm .el-form-item {
    margin-bottom: 25px;
    margin-right: 50px;
  }

  .step1 .el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }

  .step1 .el-form-item.is-required .el-form-item__label:before {
    display: none;
  }

  /* 标签 */
  .step1 .el-tag {
    padding: 10px 15px;
    margin: 10px;
    vertical-align: middle;
    height: auto;
  }

  .step1 .el-tag:first-child {
    margin-left: 0;
  }

  /* 对话框 */
  .step1 .el-dialog--small {
    width: 564px;
  }

  .step1 .el-dialog__body {
    padding-bottom: 0;
  }

  .step1 .el-dialog__body .el-form-item {
    margin-bottom: 10px;
  }

  .step1 .el-dialog__wrapper .el-button {
    margin-left: 15px;
  }

  /* 时间选择器 */
  .step1 .el-date-editor {
    width: 150px;
  }

  .step1 .el-form-item .router-link {
    color: #fff;
  }

  .el-form-item__error {
    white-space: nowrap;
  }
</style>
