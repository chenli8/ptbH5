<template>
  <div class="mediaAdd">
    <div v-if="isWx">
      <header class="mediaAdd_header">
        <div class="head_bar cf">
          <h1 class="fl logo">pintuibao</h1>
          <p class="fr safari_tip">选择“在浏览器中打开”</p>
        </div>
      </header>
    </div>
    <div v-else v-bind:class="{'browser':!isWx}">
      <header class="mediaAdd_header">
        <div class="download_bar cf">
          <img class="fl" src="../../public/img/logo2.png" alt="">
          <div class="conpany fl">
            <p>品推宝－优质媒体 自由交易</p>
            <p>Pintuibao Mobile Technology</p>
          </div>
          <a class="btn3 fr" v-on:click="toDownload">下载</a>
        </div>
      </header>
    </div>
    <div v-bind:class="{'browser':!isWx}">
      <div class="title_bar" >
        <span><span v-html="shareNickname"></span>向你推荐了<em>{{totalNum}}</em>个媒体</span>
      </div>
      <ul class="list_cntr md_detail" style="margin-top: 0">
        <li v-for="item in list" v-on:click.stop="showDetail(item)">
          <div class="list_wb" v-if="item.platform == 2">
            <div class="img_head_cntr">
              <img class="head_icon" alt="" v-bind:src="item.mediaImage"/>
            </div>
            <em class="id_mark" v-bind:class="[item.authClass]"></em>

            <div class="list_detail">
              <div class="md-name">
                <div>
                  <h4 class="wb els">{{item.mediaName}}</h4>
                </div>
              </div>
              <div class="wb_fans">粉丝数：{{item.fansNum}}</div>
              <div class="md-labels">
                <span v-for="item in item.tagList || []">{{item.length > 6 ? item.substring(0,6)+'...' : item}}</span>
              </div>
              <div class="md-num">
                <div class="zf">{{numFixed(item.spreadNum)}}</div>
                <div class="pl">{{numFixed(item.commentNum)}}</div>
                <div class="dz">{{numFixed(item.zanNum)}}</div>
              </div>
            </div>
            <span class="md-agent" v-if="item.bindNum > 0">{{item.bindNum}}人代理</span>
          </div>
          <div class="list_wx" v-if="item.platform == 1">
            <div class="img_head_cntr img_head_cntr_wx">
              <img class="head_icon" alt="" v-bind:src="item.mediaImage"/>
            </div>
            <em class="id_mark mark_wx" v-if="item.isAuth"></em>

            <div class="list_detail">
              <div class="md-name">
                <h4 class="wx els">{{item.mediaName}}</h4>
              </div>
              <div class="md-labels">
                <span v-for="item in item.tagList || []">{{item.length > 6 ? item.substring(0,6)+'...' : item}}</span>
              </div>
              <div class="md-num">
                <div class="yd">头条阅读数{{numFixed(item.readNum)}}
                </div>
              </div>
            </div>
            <span class="md-agent" v-if="item.bindNum > 0">{{item.bindNum}}人代理</span>
          </div>
          <div class="list_wb list_zhibo" v-if="item.platform == 3">
            <div class="img_head_cntr">
              <img class="head_icon" alt="" v-bind:src="item.mediaImage"/>
            </div>
            <!--<em class="id_mark mark_wx" v-if="item.isAuth"></em>-->
            <div class="list_detail">
              <div class="md-name"><!--3-映客 4-一直播 5-斗鱼 6-花椒-->
                <div v-if="item.type == 3">
                  <h4 class="yk els">{{item.mediaName}}</h4>
                </div>
                <div v-if="item.type == 4">
                  <h4 class="yzb els">{{item.mediaName}}</h4>
                </div>
                <div v-if="item.type == 5">
                  <h4 class="dy els">{{item.mediaName}}</h4>
                </div>
                <div v-if="item.type == 6">
                  <h4 class="hj els">{{item.mediaName}}</h4>
                </div>
              </div>
              <div class="wb_fans">粉丝数：{{item.fansNum}}</div>
              <div class="md-labels">
                <span v-for="item in item.tagList || []">{{item.length > 6 ? item.substring(0,6)+'...' : item}}</span>
              </div>
              <div class="md-num">
                <div class="yd">平均观看人数：{{numFixed(item.lookNum)}}</div>
                <!--<div class="pl">{{numFixed(item.commentNum)}}</div>
                <div class="dz">{{numFixed(item.zanNum)}}</div>-->
              </div>
            </div>
            <span class="md-agent" v-if="item.bindNum > 0">{{item.bindNum}}人代理</span>
          </div>
        </li>
        <li id="media_list" class="load_more" style="display: none"></li>
      </ul>
    </div>
    <footer class="mediaAdd_footer">
      <a class="btn btn_add" v-on:click.stop="toAdd">收藏</a>
      <div class="download_bar cf">
        <img class="fl" src="../../public/img/logo2.png" alt="">
        <span class="fl">品推宝－优质媒体 自由交易</span>
        <a class="btn_dl fr" v-on:click="toDownload">立即下载</a>
      </div>
    </footer>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>

<script>
  import $ from 'n-zepto'
  import '../../public/js/init.js'
  import utils from '../../public/js/utils'
  import mediaService from '../../service/mediaService.js'
  import Layer from '../../components/common/Layer'
  import  '../../public/css/vendors.css'
  import webAppApi from '../../public/js/webAppApi.js'

  var key = utils.urlParam('key');
  var platform = '';
  var token = utils.cookie.get('pintui-token');
  if (utils.urlParam('platform') == 'wx') {
    platform = '&platform=wx';
  }
  webAppApi.pullApp('mediaAdd?key=' + utils.urlParam('key') + '&type=' + utils.urlParam('type') + platform);
  export default {
    name: 'mediaAdd',
    components: {Layer},
    data () {
      return {
        layerMsg:'',
        isWx: utils.isWeiXin(),
        /*currPlatform: urlParams.type,*/
        shareNickname: "",
        shareUserId: 0,
        shareUserHeadImage: 'img/moren.png',
        totalNum: 0,
        list: []
      }
    },
    created(){
      this.postMediaList();
    },
    methods: {
      showDetail (item) {
        window.location.href = 'mediaDetail.html?pMid=' + item.pMid + '&type=' + item.type + '&plattype=' + item.platform + '&key=' + key + platform;
      },
      toAdd () {
        if (token) {
          this.mediaAdd();
        } else {
          /*window.location.href = 'loginReg.html?key=' + urlParams.key +'&type=' + urlParams.type + platform + '&urlName=mediaAdd';*/
          window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href) + platform;
        }
      },
      toDownload () {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb';
      },
      numFixed (data) {
        if (data == -1) {
          return "- -";
        } else if ((parseInt(data) / 10000) >= 1) {
          return parseFloat(data / 10000).toFixed(1) + '万';
        } else {
          return data;
        }
      },
      postMediaList(){
        $('#media_list').show();
        mediaService.shareMediaListMix({key: utils.urlParam('key')},(data)=>{
          $('#media_list').hide();
          var shareNickname = '';
          if (this.getBytesCount(data.shareNickname) > 5) {
            shareNickname = data.shareNickname.substr(0, this.getBytes(data.shareNickname, 5)) + '...';
          } else {
            shareNickname = data.shareNickname;
          }
          if (utils.urlParam('platform') == 'wx' || data.shareUserId == 1) {
            this.shareNickname = '品推宝';
          } else {
            this.shareNickname = '来自品推宝的&nbsp;<em>' + shareNickname + '</em>&nbsp';
          }
          this.shareUserId = data.shareNickname;
          var authClass = {
            '1': ['none', 'mark_wx'],
            '2': ['none', 'id_mark_y', 'id_mark_b'],
            '3': ['none', 'mark_wx'],
            '4': ['none', 'mark_wx'],
            '5': ['none', 'mark_wx'],
            '6': ['none', 'mark_wx']
          };
          this.shareUserHeadImage = data.shareUserHeadImage || data.shareUserHeadImage;
          this.totalNum = data.list.length;
          this.list = data.list;
          this.list.forEach(function (em) {
            em.authClass = authClass[em.type][em.isAuth];
            //pMids.push(em.pMid);
            var fansNum = parseInt(em['fansNum']) >= 0 ? parseInt(em['fansNum']) : 0;
            var data = fansNum / 10000;
            em['fansNum'] = data >= 1 ? parseFloat(data).toFixed(1) + '万' : em['fansNum'];
          });
          if (this.list.length == 1) {
            this.returnDetail({pMid: this.list[0].pMid, type: this.list[0].type,platform:this.list[0].platform});
          } else {
            $('body').show();
          }
        },(data)=>{
          this.layerMsg = data.message;
          setTimeout(()=>{
            this.layerMsg = '';
          }, 2000)
        })
      },
      mediaAdd(){
        var list = this.list;
        if (list.length) {
          var data = {
            pMidList: list.map(function (item) {
              return {"pMid": item.pMid, "type": item.type}
            })
          };
          if (utils.urlParam('platform') == 'wx') {
            data = {
              pMidList: list.map(function (item) {
                return {"pMid": item.pMid, "type": item.type}
              })
            }
          }
          mediaService.mediaAddBatchMix(data,(data)=>{
            window.location.href = 'result.html?flag="true"';
          },(data)=>{
            this.layerMsg = data.message;
            utils.cookie.del('pintui-token');
            setTimeout(()=>{
              window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href) + platform;
            }, 1000)
          });
        }
    },
      returnDetail(obj){
        window.location.href = 'mediaDetail.html?pMid=' + obj.pMid + '&type=' + obj.type + '&plattype=' + obj.platform +'&key=' + key;
      },
      //截取
      getBytesCount(str) {
        var bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
          var c = str.charAt(i);
          if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
          {
            bytesCount += 0.5;
          }
          else {
            bytesCount += 1;
          }
        }
        return bytesCount;
      },
    /*查找指定位置序号*/
      getBytes(str, maxVal) {
        var bytesCount = 0;
        for (var i = 0; i < str.length; i++) {
          var c = str.charAt(i);
          if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
          {
            bytesCount += 0.5;
          }
          else {
            bytesCount += 1;
          }
          if (bytesCount > maxVal) {
            return i;
            break;
          }
        }
      }
    }
  }
</script>

<style>
</style>
