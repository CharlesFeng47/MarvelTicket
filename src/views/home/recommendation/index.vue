<template>
  <div>
    <template v-for="recommendationLine in allRecommendations">
      <RecommendationLine :line="recommendationLine"></RecommendationLine>
    </template>
  </div>
</template>

<script>
  import RecommendationLine from './line/index'

  export default {
    name: 'Recommendation',
    components: {
      RecommendationLine
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
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站4',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              }
            ]
          },
          {
            title: '话剧歌剧',
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
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站4',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              }
            ]
          },
          {
            title: '体育赛事',
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
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站3',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站4',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              },
              {
                posterSrc: 'https://api.ypiao.com/event/cover.json?event_code=70a76cfa6eaab7715104a01c9fa47620&platform=6&w=196&h=252&q=80',
                name: '"绝色"莫文蔚巡回演唱会2018-上海站5',
                basePrice: 400,
                city: '上海',
                spot: '虹口足球场',
                time: '2018-06-03 19:00'
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
