<template>
  <div v-loading="recommendationLoading">
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
        recommendationLoading: false,
        allRecommendations: []
      }
    },
    computed: {
      ...mapGetters([
        'cur_city'
      ])
    },
    watch: {
      cur_city: {
        handler: function(newVal, oldVal) {
          this.initHome()
        }
      }
    },
    methods: {
      initHome() {
        this.recommendationLoading = true
        new Promise((resolve, reject) => {
          recommend(this.cur_city).then(recommendations => {
            this.changeRecommendations(recommendations)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).then(() => {
          this.recommendationLoading = false
        }).catch(() => {
          this.recommendationLoading = false
        })
      },
      changeRecommendations(data) {
        // console.log(data);

        var allRecommendations = []
        for (var key in data) {
          var type = {}
          type.title = key
          type.recommendations = []
          // console.log(data[key])
          for (var i in data[key]) {
            var recommendation = {}
            recommendation.programID = data[key][i]['id']
            recommendation.posterSrc = data[key][i]['imageUrl']
            recommendation.name = data[key][i]['programName']
            recommendation.basePrice = data[key][i]['lowPrice']
            recommendation.city = data[key][i]['city']
            recommendation.spot = data[key][i]['venueName']
            recommendation.time = data[key][i]['time']
            // console.log(type)
            type.recommendations.push(recommendation)
          }
          allRecommendations.push(type)
        }
        // console.log(allRecommendations)
        this.allRecommendations = allRecommendations
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-loading-parent--relative{
    .el-loading-mask{
      padding-top: 40px;
      .el-loading-spinner{
      }
    }
  }
</style>
