<template>
  <div>
    <h1>选择订座类型并订座</h1>
  </div>
</template>

<script>
  // 选择订座类型并订座
  export default {
    name: 'step1',
    methods: {
      // 验证表单
      validateData() {
        // this.$refs['basicInfoForm'].validate((valid) => {
        //   if (valid) {
        //     this.$emit('next')
        //   } else {
        //     console.log('error submit!!')
        //   }
        // })
        this.$emit('next')
      }
    }
  }
</script>

<style scoped>

</style>
