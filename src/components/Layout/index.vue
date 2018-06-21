<template>
  <div @click="hideSearch">
    <MyHeader/>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader/index'
  import HomeLayout from '../HomeLayout/index'
  import MyFooter from '../../components/MyFooter/index'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      MyHeader,
      HomeLayout,
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
