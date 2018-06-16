<template>
  <!--TODO gy 加载时加载图案与轮播图部分重合-->
  <div v-loading="ordersLoading">
    <template v-for="recommendationLine in allRecommendations">
      <RecommendationLine :line="recommendationLine"></RecommendationLine>
    </template>
  </div>
</template>
<script>
  import RecommendationLine from './line/index'
  import { recommend } from '../../../api/program'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Recommendation',
    components: {
      RecommendationLine
    },
    mounted: function() {
      this.initHome()
    },
    data() {
      return {
        ordersLoading: false,
        allRecommendations: []
      }
    },
    computed: {
      ...mapGetters([
        'cur_city'
      ])
    },
    methods:{
      initHome(){
        this.ordersLoading = true;
        new Promise((resolve, reject) => {
          recommend(this.cur_city).then(response => {
            if (response.state === 'OK') {
              const recommendations = JSON.parse(response.object)
              this.changeRecommendations(recommendations)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.ordersLoading = false
        }).catch(() => {
          this.ordersLoading = false
        })
      },
      changeRecommendations(data) {
        // console.log(data);

        var allRecommendations = [];
        for (var key in data) {
          var type = {}
          type.title = key;
          type.recommendations = [];
          // console.log(data[key])
          for (var i in data[key]){
            var recommendation = {};
            recommendation.programID = data[key][i]['id'];
            recommendation.posterSrc = data[key][i]['poster'];
            recommendation.name = data[key][i]['programName'];
            recommendation.basePrice = data[key][i]['lowPrice'];
            recommendation.city= data[key][i]['city'];
            recommendation.spot= data[key][i]['venueName'];
            recommendation.time= data[key][i]['time'];
            // console.log(type)
            type.recommendations.push(recommendation);
          }
          allRecommendations.push(type)
        }
        // console.log(allRecommendations)
        this.allRecommendations = allRecommendations
      }
    }
  }
</script>

<style scoped>

</style>
