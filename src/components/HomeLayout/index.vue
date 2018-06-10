<template>
  <div>
    <MyHeader/>
    <Navigate/>
    <Carousel v-if="this.$route.meta.isHome"/>
    <router-view></router-view>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Navigate from './Navigate/index'
  import Carousel from '../../views/home/carousel/index'
  import MyFooter from '../../components/MyFooter/index'

  export default {
    components: {
      MyHeader,
      Navigate,
      Carousel,
      MyFooter
    },
  }
</script>

<style scoped>

</style>
