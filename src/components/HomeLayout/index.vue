<template>
  <div>
    <el-row v-if="!this.$route.meta.isSearch">
      <el-col :span="18" :offset="3">
        <Navigate/>
      </el-col>
    </el-row>
    <div v-else style="height: 40px">
    </div>
    <Carousel v-if="this.$route.meta.isHome"/>
    <el-row>
      <el-col :span="18" :offset="3">
        <transition name="fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Navigate from './Navigate/index'
  import Carousel from '../../views/home/carousel/index'
  import MyFooter from '../../components/MyFooter/index'
  import { mapGetters } from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      MyHeader,
      Navigate,
      Carousel,
      MyFooter
    },
    data(){
      return{
      }
    },
  }
</script>

<style scoped>

</style>
