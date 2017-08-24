<template>
  <div class="main">
    <div class="time" v-if="appFlug">
      <div class="time-lf">
        <p>{{time}}</p>
      </div>
      <div class="time-rg fl tj7_30but">
        <ul>
          <a href="javascript:;" :class="{'on':isCharts7And30,'buttonGray':!isCharts7And30}"
             @click="getData(1)">近7天</a>
          <a href="javascript:;" :class="{'buttonGray':isCharts7And30,'on':!isCharts7And30}"
             @click="getData(2)">近30天</a>
        </ul>
      </div>
    </div>
    <brand-header v-else></brand-header>
    <div class="charts" v-if="loading">
      <div class="media-charts">
        <market-chart :data="data" v-if="data.mediaTrend"></market-chart>
        <media-chart :data="data" v-if="data.mediaDistribution"></media-chart>
      </div>
      <div class="emotion-charts">
        <emotion-chart :data="data" v-if="data.sentimentTrend"></emotion-chart>
        <emtdistrib-chart :data="data" v-if="data.sentimentDistribution"></emtdistrib-chart>
      </div>
      <div class="regional-charts" v-if="data.regionDataList">
        <map-chart :data="data"></map-chart>
        <regional-chart :data="data"></regional-chart>
      </div>
    </div>
    <msg></msg>
  </div>
</template>

<script>
  import "../../../public/css/style.css";
  import BrandHeader  from "./BrandHeader.vue";

  import MarketChart  from "./MarketTrendChart.vue";
  import MediaChart  from "./MediaDistrib.vue";
  import EmotionChart  from "./EmotionChart.vue";
  import EmtdistribChart  from "./EmtdistribChart.vue";
  import MapChart  from "./MapChart.vue";
  import RegionalChart  from "./RegionalChart.vue";

  import utils from '../../../public/js/utils';
  import brandService from '../../../service/brandService'
  import {msg} from '../../common/layer/Index.vue'
  export default {
    name: 'appBrandChartIndex',
    data(){
      return {
        time: "",
        loading: false,
        appFlug: false,
        isCharts7And30: false,
        data: {}
      }
    },
    created(){
      var source = utils.urlParam("source");
      if (source == 'app') {
        this.appFlug = true
      }
    },
    methods: {
      getData(timeType){
        var brandId = utils.urlParam("brandId");
        var data = {brandId: brandId, time: timeType};
        brandService.aBrandDataReport(data, (data, systemDate) => {
          this.time = systemDate;
          this.getTime(timeType, data);
        }, (data) => {
          this.$store.dispatch('msg', {msg: data.message})
        });
      },
      getTime(timeType, data){
        this.loading = false;
        if (timeType == 1) {
          this.isCharts7And30 = true;
          this.time = utils.DateFormat(this.time - (6 * 24 * 60 * 60 * 1000),'YYYY/MM/DD') + '-' + utils.DateFormat(this.time,'YYYY/MM/DD');
        } else if (timeType == 2) {
          this.isCharts7And30 = false;
          this.time = utils.DateFormat(this.time - (29 * 24 * 60 * 60 * 1000),'YYYY/MM/DD') + '-' + utils.DateFormat(this.time,'YYYY/MM/DD');
        }
        this.data = data;

        setTimeout(() => {
          this.loading = true;
        }, 10);
      }
    },
    mounted(){
      this.getData(2);
    },
    components: {
      MarketChart,
      MediaChart,
      EmotionChart,
      EmtdistribChart,
      MapChart,
      RegionalChart,
      BrandHeader,
      msg
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: auto;
  }

  .main .time {
    width: 100%;
    height: 0.5rem;
    border-top: solid 0.005rem #ddd;
    padding: 0 0.1rem;
    box-sizing: border-box;
    border-bottom: solid 0.005rem #ddd;
  }

  .main .time .time-lf {
    float: left;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .main .time .time-lf p {
    font-size: 0.14rem;
    color: #9B9B9B;
    letter-spacing: 0;

  }

  .main .time .time-rg {
    float: right;
    width: 1.4rem;
    height: 0.24rem;
    background: #F7F8FA;
    border-radius: 3px;
    margin-top: 0.13rem;
  }

  .time-rg ul {
    width: 1.4rem;
    height: 0.24rem;
  }

  .time-rg ul a {
    float: left;
    width: 0.7rem;
    font-size: 0.14rem;
    text-align: center;
    height: 0.24rem;
    line-height: 0.24rem;
    color: #252525;
    border-radius: 3px;
  }

  .time-rg ul a.on {
    background: #FFC72F;

  }

  .charts {
    background: #f7f8fa;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }

  .charts .media-charts {
    width: 100%;
    background: #fff;
    border-bottom: 0.005rem solid #E8E8E8;
    box-sizing: border-box;
    padding: 0.16rem;
    overflow:hidden;

  }

  .charts .emotion-charts {
    width: 100%;
    margin: 0.1rem 0;
    background: #fff;
    border-bottom: 0.005rem solid #E8E8E8;
    border-top: 0.005rem solid #E8E8E8;
    padding: 0.16rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  .charts .regional-charts {
    width: 100%;
    margin: 0.1rem 0;
    background: #fff;
    border-bottom: 0.005rem solid #E8E8E8;
    border-top: 0.005rem solid #E8E8E8;
    padding-bottom: 2rem;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
