<template>
  <div class="web-show">
    <div class="BrandHeader">
      <dl>
        <dt><img v-bind:src="picUrl" alt=""></dt>
        <dd>
          <h3>{{name}}</h3>
          <a href="javascript:;" class="buttonGray on" @click="focus(subscribe == 1 ? 2 : 1)" v-if="subscribe">
            {{subscribe == 1 ? '取消关注' : '关注品牌'}}
          </a>
        </dd>
      </dl>
    </div>
    <div class="times">
      <p>{{time}}</p>
    </div>
    <msg></msg>
  </div>

</template>

<script>
  import brandService from '../../../service/brandService'
  import utils from '../../../public/js/utils'
  import {msg} from '../../common/layer/Index.vue'
  export default {
    name: 'BrandHeader',
    components: {msg},
    data(){
      return {
        time: '',
        brandId: utils.urlParam("brandId"),
        name: '',
        picUrl: '',
        subscribe: ''
      }
    },
    mounted(){
      this.getBrandDetail();
    },
    methods: {
      getBrandDetail(){
        var data = {brandId: this.brandId};
        brandService.aBrandDetail(data, (data, systemDate) => {
          this.name = data.brandInfo.name;
          this.picUrl = data.brandInfo.picUrl;
          this.subscribe = data.brandInfo.subscribe;
          this.time = utils.DateFormat(systemDate - (29 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD') + '-' + utils.DateFormat(systemDate, 'YYYY/MM/DD');
        }, (data) => {

        });
      },
      focus(type){
        window.location.href = 'download.html';
        return;
        var token = utils.cookie.get('pintui-token');
        if (token) {
          var data = {
            brandId: this.brandId,
            actionType: type
          }
          brandService.aBrandSubscribe(data, (data) => {
            this.$store.dispatch('msg', {msg: type == 1 ? '关注成功' : '取消成功'})
            setTimeout(() => {
              location.reload()
            }, 2000)
          }, (data) => {
            this.$store.dispatch('msg', {msg: data.message})
          });
        } else {
          window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href) + '#/login';
        }
      }
    }
  }
</script>

<style scoped>
  img {
    width: .69rem;
    height: .69rem;
  }

  .web-show {
    background: #f7f8fa;
  }

  .BrandHeader {
    background: #fff;
    width: 100%;
    height: 1.17rem;
    padding: 0.24rem 0.36rem;
    box-sizing: border-box;
    border-bottom: solid 0.01rem #E8E8E8;
  }

  .BrandHeader dl {
    width: 100%;
    display: flex;
  }

  .BrandHeader dl dt {
    width: 0.69rem;
    height: 0.69rem;
    border: 1px solid #EEEEEE;
    border-radius: 3px;
    margin-right: 0.18rem;
  }

  .BrandHeader dl dt img {
    display: block;
    width: 100%;
  }

  .BrandHeader dl dd {
    -webkit-flex: 1;
  }

  .BrandHeader dl dd h3 {
    font-size: 0.16rem;
    color: #252525;
    line-height: 0.16rem;
    margin-top: 0.05rem;
  }

  .BrandHeader dl dd a {
    width: 0.77rem;
    display: block;
    font-size: 0.14rem;
    text-align: center;
    height: 0.3rem;
    line-height: 0.3rem;
    color: #252525;
    margin-top: 0.13rem;
  }

  .BrandHeader dl dd a.on {
    background: #FFC72F;
    border: 1px solid #FFC72F;
    border-radius: 3px;
  }

  .times {
    height: 0.42rem;
    width: 100%;
    line-height: 0.42rem;
    padding-left: 0.12rem;
    font-size: 0.14rem;
    border-bottom: solid 0.01rem #E8E8E8;
    box-sizing: border-box;
  }

</style>
