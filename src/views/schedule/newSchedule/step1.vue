<template>
  <div class="step1">
    <!--<h1>{{ curStep }}</h1>-->
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
    </el-form>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { getSchedule } from '../../../api/schedule'

  export default {
    name: 'step1',
    props: ['curStep'],
    computed: {
      ...mapGetters([
        'basic_info_form',
        'basic_info_form_modified'
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
      },
      $route: function(newRoute, oldRoute) {
        // watch 当前路由和之前的路由的isNew是否相同，不同则将内容重新获取
        if (newRoute.meta.isNew !== oldRoute.meta.isNew) {
          this.fetchDefaultData()
        }
      }
    },
    methods: {
      // 验证表单
      validateData() {
        this.$refs['basicInfoForm'].validate((valid) => {
          if (valid) {
            this.$emit('next')
          } else {
            console.log('error submit!!')
          }
        })
      },
      // 重置表单
      resetData() {
        this.$refs['basicInfoForm'].resetFields()
      },
      // 页面的默认值
      fetchDefaultData() {
        if (this.$route.meta.isNew) {
          // 新建的计划，基本信息默认为空
          this.resetData()
        } else {
          // 是修改已存在的计划，获得内容后自动填充
          new Promise((resolve, reject) => {
            getSchedule(this.$route.params.scheduleId).then(response => {
              console.log(response)
              if (response.state === 'OK') {
                var defaultBasicInfoForm = {}
                const scheduleDetail = JSON.parse(response.object)
                defaultBasicInfoForm.name = scheduleDetail.name
                defaultBasicInfoForm.type = scheduleDetail.type
                defaultBasicInfoForm.description = scheduleDetail.description

                var startDateTime = scheduleDetail.startDateTime
                var dateString = startDateTime.split(' ')[0]
                var timeString = startDateTime.split(' ')[1]

                var curDate = new Date()
                var dateParts = dateString.split('-')
                curDate.setFullYear(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]))
                defaultBasicInfoForm.date = curDate

                var curTime = new Date()
                var timeParts = timeString.split(':')
                curTime.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]))
                defaultBasicInfoForm.time = curTime

                this.$store.dispatch('ChangeBasicInfo', defaultBasicInfoForm).then(() => {
                  this.fulfillStoredData()
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
        }
      },
      // 填充store里面的值
      fulfillStoredData() {
        this.basicInfoForm.name = this.basic_info_form.name
        this.basicInfoForm.date = this.basic_info_form.date
        this.basicInfoForm.time = this.basic_info_form.time
        this.basicInfoForm.type = this.basic_info_form.type
        this.basicInfoForm.description = this.basic_info_form.description
      }
    },
    mounted: function() {
      console.log('basic_info_form mounted: basicInfoForm-----')
      if (!this.basic_info_form_modified) {
        console.log('step1 第一次，获取数据')
        this.fetchDefaultData()
      } else {
        console.log('step1 已修改过数据，从store中加载数据')
        this.fulfillStoredData()
      }
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
