<template>
  <div>
    <div id="main3" :style="{width:'106%',height:'2.3rem'}"></div>
  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入折线图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  import utils from '../../../public/js/utils';
  export default {
    name: 'market-chart',
    props:["data"],
    data (){
      return {

      }
    },
    methods:{
         chart(){
           var myChart = echarts.init(document.getElementById('main3'));
           var negative=[],neutral=[],positive=[],alltime=[];
           var THIS=this.data;
           THIS.sentimentTrend.negative.map(function(data){
             var dates =utils.DateFormat(data.timestemp,'MM/DD');
             alltime.push(dates)
             negative.push(data.data)
           });
           THIS.sentimentTrend.neutral.map(function(data){
             neutral.push(data.data)
           });
           THIS.sentimentTrend.positive.map(function(data){
             positive.push(data.data)
           });
           var   option = {
             title: {
               text: '情感走势',
               textStyle:{
                 fontSize:"14px",
                 fontWeight:900
               },
               top:"12",
               right:"83%"
             },
             tooltip: {
               trigger: 'axis'
             },
             color:["#FFCD28",'#BAC8E6','#FF615B'],
             legend: {
               itemGap:13,
               itemWidth:13,
               data:[{
                 name: '正面',
                 icon: 'square',
               },{
                 name: '中性',
                 icon: 'square',
               },{
                 name: '负面',
                 icon: 'square',
               }],
               right:"9%",
               y: "12"
             },
             grid: {
               top:60,
               bottom:50,
               backgroundColor: 'rgba(0,0,0,0)',
             },
             xAxis: {
               type: 'category',
               axisTick: {
                 alignWithLabel: false,
                 show:false
               },
               splitNumber:14,
               boundaryGap: ['20%', '20%'],
               splitLine:{
                 lineStyle: {
                   color:"red",
                   type:"dashed"
                 }
               },
               axisLine:{
                 lineStyle:{
                   color:'#9B9B9B',
                 }
               },
               axisLabel: {
                interval: function(index){
                   if(alltime.length > 7 ){
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
                     return  params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                   }
                 }
               },
               data:alltime
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
                   show:false
                 },
                 axisLine:{
                   show:false,
                 }
               }
             ],
             series: [
               {
                 name:'正面',
                 symbol:null,
                 type:'line',
                 data: positive
               },
               {
                 name:'中性',
                 type:'line',
                 symbol:null,
                 data:neutral
               },
               {
                 name:"负面",
                 type:'line',
                 symbol:null,//拐点样式,
                 data:negative
               },

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
 #main3{
   box-sizing: border-box;
 }
</style>
