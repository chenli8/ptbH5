<template>
  <div>
    <div id="main1" :style="{width:'106%',height:'2.2rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入折线图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');



  import utils from '../../../public/js/utils';
  export default {
    name: 'market-chart',
    props: ["data"],
    data (){
      return {}
    },
    methods: {
      chart(){
        var myChart = echarts.init(document.getElementById('main1'));
        var colors = ["#000", '#EF7553 ', '#50CF96'];
        /*获取数据 */
        var allTrend = [], wbTrend = [], wxTrend = [], alltime = [];
        var THIS = this.data;
        THIS.mediaTrend.allTrend.map(function (data) {
          var dates = utils.DateFormat(data.timestemp, 'MM/DD');
          alltime.push(dates)
          allTrend.push(data.data)
        });
        THIS.mediaTrend.wbTrend.map(function (data) {
          wbTrend.push(data.data)
        });
        THIS.mediaTrend.wxTrend.map(function (data) {
          wxTrend.push(data.data)
        });
        var option = {
          title: {
            text: '舆情走势',
            textStyle: {
              fontSize: "14px",
              fontWeight: 900
            },
            top: "12",
            right:"83%"
          },
          tooltip: {
            trigger: 'axis'
          },
          color: colors,
          legend: {
            itemGap: 13,
            itemWidth: 13,
            data: [{
              name: '全部',
              icon: 'square',
            }, {
              name: '微信',
              icon: 'square',
            }, {
              name: '微博',
              icon: 'square',
            }],
            y: "12",
            right:"9%"
          },
          grid: {
            top: 60,
            bottom: 50,
            backgroundColor: 'rgba(0,0,0,0)',
          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: false,
              show: false
            },
            splitNumber: 14,
            boundaryGap: ['20%', '20%'],
            axisLine: {
              lineStyle: {
                color: '#9B9B9B',
              }
            },
            axisLabel: {
              interval: function(index){
                  if(allTrend.length > 7 ){
                    if(index % 5 == 0){
                      return true
                    }
                  }else{
                    if(index != 6){
                      return true
                    }
                  }
              },
              textStyle: {
                fontSize:"10px",
                color:"#4C4C4C",
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                }
              }
            },
            data: alltime
          },
          yAxis: [
            {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              axisTick: {
                alignWithLabel: false,
                show: false
              },
              axisLine: {
                show: false,
              }
            }
          ],
          series: [
            {
              name: "全部",
              type: 'line',
              symbol: null,//拐点样式,
              data: allTrend
            },
            {
              name: '微博',
              type: 'line',
              symbol: null,
              data: wbTrend
            },
            {
              name: '微信',
              symbol: null,
              type: 'line',
              data: wxTrend
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    mounted (){
      this.chart();
    }
  }
</script>

<style scoped>

</style>
