<template>
  <div>
    <div id="main4" :style="{width:'100%',height:'2.44rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/pictorialBar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: 'emtdistrib-chart',
    props: ["data"],
    methods: {
      chart(){
        var myChart = echarts.init(document.getElementById('main4'));
        var pathSymbols = {
          smile: "image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ0LjEgKDQxNDU1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuiIhuaDheivpuaDhSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWTgeeJjOaVsOaNruaKpeWRiiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3Ni4wMDAwMDAsIC0xMDM3LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i56ys5LqM6KGoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNzMyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS01LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgMjQxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjAuMDAwMDAwLCA2NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC02LUNvcHktMyIgZmlsbD0iI0E2OEMzOCIgY3g9IjMiIGN5PSIzIiByPSIzIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC02LUNvcHktMiIgZmlsbD0iI0E2OEMzOCIgY3g9IjE3IiBjeT0iMyIgcj0iMyI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LDExIEM2LDEzLjIwOTEzOSA3Ljc5MDg2MSwxNSAxMCwxNSBDMTIuMjA5MTM5LDE1IDE0LDEzLjIwOTEzOSAxNCwxMSIgaWQ9IlBhdGgtQ29weSIgc3Ryb2tlPSIjQTY4QzM4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
          sad: "image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ0LjEgKDQxNDU1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuiIhuaDheivpuaDhSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWTgeeJjOaVsOaNruaKpeWRiiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc3LjAwMDAwMCwgLTEwMTkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnrKzkuozooagiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA3MzIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUmVjdGFuZ2xlLTUtQ29weSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCAyNDEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYxLjAwMDAwMCwgNDYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNiIgZmlsbD0iI0FFM0YzQiIgY3g9IjMiIGN5PSIzIiByPSIzIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC02LUNvcHkiIGZpbGw9IiNBRTNGM0IiIGN4PSIxNyIgY3k9IjMiIHI9IjMiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNiwxMSBDNiwxMy4yMDkxMzkgNy43OTA4NjEsMTUgMTAsMTUgQzEyLjIwOTEzOSwxNSAxNCwxMy4yMDkxMzkgMTQsMTEiIGlkPSJQYXRoIiBzdHJva2U9IiNBRDNGM0IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDEzLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTAuMDAwMDAwLCAtMTMuMDAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
          mid: "image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMjAgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ0LjEgKDQxNDU1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuiIhuaDheivpuaDhSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWTgeeJjOaVsOaNruaKpeWRiiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3OC4wMDAwMDAsIC0xMDQ5LjAwMDAwMCkiIGZpbGw9IiM2RDcwNzgiPgogICAgICAgICAgICA8ZyBpZD0i56ys5LqM6KGoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNzMyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS01LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2LjAwMDAwMCwgMjQxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjIuMDAwMDAwLCA3Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC02IiBjeD0iMyIgY3k9IjMiIHI9IjMiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTYtQ29weSIgY3g9IjE3IiBjeT0iMyIgcj0iMyI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMTciIHg9IjUiIHk9IjEyIiB3aWR0aD0iMTAiIGhlaWdodD0iMiIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
        };
        var option = {
          title: {
            text: '情感分布',
            textStyle: {
              fontSize: "14px",
              fontWeight: 900
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: [
            {
              axisTick: {
                alignWithLabel: false,
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#000'
                }
              },
              type: 'category',
              data: ['负面', '中性', '正面'],
            }
          ],
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          selectedMode:{'bar':false,'glyph':false},
          series: [
            {
              name: 'bar',
              type: 'bar',
              barWidth: '40%',
              barGap: '-100%',
              zlevel:1,
              label: {
                normal: {
                  position: 'bottom',
                  offset: [-0, 17],
                  show: true,
                  textStyle: {
                    color: "#000"
                  }
                }
              },
              data: [
                this.data.sentimentDistribution.negativeNum,
                this.data.sentimentDistribution.neutralNum,
                this.data.sentimentDistribution.positiveNum
              ],
              barMinHeight: 30,
              itemStyle: {
                normal: {
                  color: function (params) {
                    //首先定义一个数组
                    var colorList = ['#FF615B', '#BAC8E6', "#FFCD28"];
                    return colorList[params.dataIndex]
                  },
                  barBorderRadius: [60, 60, 0, 0]
                }
              },
            },
            /* 假柱子 用于 图形 */
            {
              name: 'glyph',
              type: 'pictorialBar',
              barGap: '-100%',
              symbolPosition: 'end',
              symbolSize: 50,
              symbolOffset: [0, '60%'],
              barMinHeight: 30,
              zlevel:2,
              data: [
                {
                  value: this.data.sentimentDistribution.negativeNum,
                  symbol: pathSymbols.sad,
                  symbolSize: [23, 16]
                }, {
                  value: this.data.sentimentDistribution.neutralNum,
                  symbol: pathSymbols.mid,
                  symbolSize: [23, 16]
                }, {
                  value: this.data.sentimentDistribution.positiveNum,
                  symbol: pathSymbols.smile,
                  symbolSize: [23, 18]

                }
              ]
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    mounted (){
      this.chart()
    }
  }
</script>

<style scoped>

</style>
