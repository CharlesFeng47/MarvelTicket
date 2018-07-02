<template>
  <span >
    <span class="venue-name" >{{ spotName }}</span>
    <div class="map-block">
      <div id="allmap"></div>
    </div>
  </span>
</template>

<script>
  export default {
    name: 'my-map',
    props: [
      'address',
      'spotName'
    ],
    mounted: function() {
      this.initMap()
    },
    watch: {
      spotName: {
        handler: function(newVal, oldVal) {
          this.initMap()
        }
      }
    },
    methods: {
      initMap() {
        var address = this.address
        var map = new BMap.Map('allmap')
        var point = new BMap.Point(116.331398, 39.897445)
        map.centerAndZoom(point, 12)
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder()
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function(point) {
          if (point) {
            // setTimeout(function(){
            var marker = new BMap.Marker(point)
            var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)})
            marker.setLabel(label)
            map.centerAndZoom(point, 16)
            map.addOverlay(marker)
            // map.panTo(point)
            //
            // }, 10)
          } else {
            // alert('您选择地址没有解析到结果!')
          }
        }, address)
      }
    }
  }
</script>

<style scoped>
  .map-block{
    width: 480px;
    height: 300px;
    opacity: 0;
    display:inline-block;
    position: absolute;
    padding: 3px;
    border: 1px solid #DCDFE6;
    border-radius: 2px;
    margin-top: -1200px;
    overflow: hidden;
    background-color: whitesmoke;
  }
  #allmap{
    width: 480px;
    height: 600px;
    margin-top: -150px;
  }
  .venue-name:hover {
    cursor: pointer;
  }
  .venue-name:hover + .map-block{
    z-index: 1000;
    opacity: 1.0;
    margin-left: 3px;
    margin-top: 0px;
  }
</style>
