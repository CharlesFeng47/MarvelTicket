<template>
  <div>
    <template v-for="recommendationLine in allRecommendations">
      <RecommendationLine :line="recommendationLine"></RecommendationLine>
    </template>
  </div>
</template>
<script>
  import RecommendationLine from './line/index'
  import { recommend } from '../../../api/program'
  import index from "../../../router";
  export default {
    name: 'Recommendation',
    components: {
      RecommendationLine
    },
    mounted: function() {
      this.initHome()
    },
    methods:{
      initHome(){
        new Promise((resolve, reject) => {
          recommend("上海").then(response => {
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
        })
      },
      changeRecommendations(data) {
        // console.log(data);

        var allRecommendations = [];
        for (var key in data) {
          var type ={}
          type.title = key;
          type.recommendations = [];
          // console.log(data[key])
          for (var i in data[key]){
            var recommendation ={};
            recommendation.programID = data[key][i]['id'];
            recommendation.posterSrc = "data:image/gif;base64," + data[key][i]['poster'];
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
        // console.log(12345);
        // console.log(allRecommendations)
        this.allRecommendations = allRecommendations
      }
    },
    data() {
      return {
        // TODO 填充数据

        allRecommendations: [
          {
            title: '演唱会',
            recommendations: [
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站2',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              }]
          }

          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     }
          //   ]
          // },
          // {
          //   title: '话剧歌剧',
          //   recommendations: [
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站2',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站4',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     }
          //   ]
          // },
          // {
          //   title: '体育赛事',
          //   recommendations: [
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站1',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站2',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站4',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     },
          //     {
          //       posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
          //       name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
          //       basePrice: 400,
          //       city: '上海',
          //       spot: '虹口足球场',
          //       time: '2018-06-03 19:00'
          //     }
          //   ]
          // }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
