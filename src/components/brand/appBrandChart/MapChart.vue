<template>
  <div>
    <div id="main6" :style="{width:'106%',height:'2.5rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入地图
  require('echarts/lib/chart/map');
  require('echarts/lib/component/visualMap');/* 地图显示不同颜色 */
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  /* 中国地图各省 */
  import '../../../public/js/echartsMapChina.json'
  export default {
    name: 'map-chart',
    props: ["data"],
    methods: {
      chart(){
          var THIS = this;
        $.get('static/js/echartsMapChina.json', function (chinaJson) {
          echarts.registerMap('china', chinaJson);
          var myChart = echarts.init(document.getElementById('main6'));
          var regionDataList = [];
          THIS.data.regionDataList.map(function (data) {
            var obj = {};
            obj.name = data.regionName.replace('省', '').replace('自治区', '').replace('特别行政区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '');
            obj.value = data.number;
            regionDataList.push(obj)
          });
          var maxnum=regionDataList[regionDataList.length-1].value;
          //不显示海南岛
          regionDataList.push({name: '南海诸岛', value: 0, itemStyle: {normal: {opacity: 0, label: {show: false}}}})
          var option = {
            title: {
              text: '舆论热区',
              textStyle: {
                fontSize: "14px",
                fontWeight: 900
              },
              top: "27",
              left: '13'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b0}: {c0}'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: [''],
            },
            visualMap: {
              min: 0,
              max:maxnum,
              type:"continuous",
              right:"10%",
              bottom:"1%",
              barBorderRadius: [100, 100, 100, 100],
              itemHeight: "60%",
              top: 'bottom',
              align:"right",
              text: ['高', '低'],           // 文本，默认为数值文本
              calculable: true,
              inRange: {
                color: ['#fff', '#196CCF',]
              },

            },
            toolbox: {
              show: false,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
              }
            },
            series: [
              {
                type: 'map',
                mapType: 'china',
                roam: false,
                showLegendSymbol: false,
                layoutCenter: ['100%', '50%'],
                left:"7%",
                top:"20%",
                zoom:1,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                data: regionDataList
              },
            ]
          };
          myChart.setOption(option);
        });
      }
    },
    mounted (){
      this.chart()
    }
  }
</script>

<style scoped>

</style>
