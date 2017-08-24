<template>
  <div>
    <div id="main2" :style="{width:'100%',height:'2.3rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入饼状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  export default {
    name: 'media-chart',
    props: ["data"],
    methods: {
      chart(){
        var myChart = echarts.init(document.getElementById('main2'));
        var option = {
          color: ['#EF7553 ', '#50CF96'],
          title: {
            text: '媒体分布',
            textStyle: {
              fontSize: "15px",
              fontWeight: 900
            },
          },
          markPoint: {
            clickable: false
          },
          tooltip: {
            trigger: 'item',
            formatter: " {b}: {d}%",
            textStyle: {
              color: "#fff"
            }
          },
          legend: {

          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['45%', '75%'],
              avoidLabelOverlap: false,
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: '#ffffff',
                },
                emphasis: {
                  borderWidth: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  formatter: '{b}{d}%',
                  textStyle: {
                    color: "#000"
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#ccc'
                  }
                }
              },
              data: [
                {value: this.data.mediaDistribution.wbPrecent, name: '微博'},
                {value: this.data.mediaDistribution.wxPrecent, name: '微信'},
              ]
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    mounted(){
      this.chart()
    }
  }
</script>

<style scoped>

</style>
