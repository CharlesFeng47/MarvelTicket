<template>
  <div @click="hideSearch">
    <!--isShow 是用来判断是否让搜索弹框消失 city用于判断当前城市-->
    <MyHeader/>
    <el-row>
      <el-col :span="18" :offset="3">
        <Navigate/>
      </el-col>
    </el-row>
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
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import Navigate from './Navigate/index'
  import Carousel from '../../views/home/carousel/index'
  import MyFooter from '../../components/MyFooter/index'
  import ElRow from "element-ui/packages/row/src/row";
  import { mapGetters } from 'vuex'

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
    computed: {
      ...mapGetters([
        'show_popover',
      ])
    },
    methods:{
      hideSearch(){
        this.$store.dispatch('HidePopover', {
        }).then(() => {
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
