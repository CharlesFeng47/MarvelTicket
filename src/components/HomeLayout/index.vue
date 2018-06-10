<template>
  <div>
    <MyHeader/>
    <Navigate/>
    <router-view></router-view>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Navigate from './Navigate/index'
  import MyFooter from '../../components/MyFooter/index'

  export default {
    components: {
      MyHeader,
      Navigate,
      MyFooter
    },
  }
</script>

<style scoped>

</style>
