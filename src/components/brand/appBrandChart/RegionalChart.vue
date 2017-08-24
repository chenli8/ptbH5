<template>
  <div>
    <div id="main5" :style="{width:'100%',height:'2.4rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'regional-chart',
    props: ["data"],
    methods: {
      chart(){
        var myChart = echarts.init(document.getElementById('main5'));
        /*取出省市的前五个*/
        function sortNumber(a, b) {
          return a.number - b.number
        }

        this.data.regionDataList.sort(sortNumber);
        var ary = this.data.regionDataList.slice(-5);
        var aryNew = [];
        ary.map((data) => {
          if (data.number > 0) {
            data.regionName = data.regionName.replace('省', '').replace('自治区', '').replace('特别行政区', '').replace('维吾尔', '').replace('壮族', '').replace('回族', '')
            aryNew.push(data)
          }
        });
        var option = {
          grid: {
            left: '10%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            show: false,
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            nameLocation: ['end', 'left'],
            z: 12,
            axisTick: {
              alignWithLabel: false,
              show: false
            },
            axisLabel: {
              margin: -40,
              textStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999',
              }
            },
            type: 'category',
            data: aryNew.map(function (data, index) {
              return data.regionName
            })
          },
          series: [{
            type: 'bar',
            stack: 'chart',
            itemStyle: {
              normal: {
                barBorderRadius: [100, 100, 100, 100],
                color: "#66ACFF"
              },
            },
            barMinHeight:60,
            label: {
              normal: {
                position: 'right',
                show: true
              }
            },
            data: aryNew.map(function (data) {
              return data.number
            })
          }]
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
  #main5{
    top: -0.2rem;
  }
</style>
