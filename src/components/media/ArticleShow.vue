<template>
  <div class="articleShow" id="articleShow" style="background-color: #fff">
    <section class="articleShow_wx" v-if="html">
      <header>
        <div class="mediaName fl" v-on:click="showDetail">
          <i class="ico-mediaImgWx" v-bind:style="{backgroundImage:'url('+mediaImg+')'}"></i>
          <em class="id_mark mark_wx" v-if="isAuth==1"></em>
          <i class="icon-wx"></i>
          <span class="mediaName_text">{{mediaName}}</span>
          <span class="mediaName_dsc">近7日: 发布{{pubNum}}次 头条均阅读{{hlavGread}}</span>
        </div>
        <div class="mediaAdd fr" v-on:click="showDetail">
          <!--<img src="img/ico-mediaAdd.png" alt="" v-on:click="toAdd" v-if="isMediaCollected==0"/>-->
          <!--<img src="img/ico-mediaAddOk.png" alt="" v-if="isMediaCollected==1"/>-->
          媒体详情
          <i class="icon-arrow"></i>
        </div>
      </header>
      <div class="content">
        <div class="rich_media_inner">
          <div id="page-content">
            <div id="img-content" class="rich_media_area_primary">
              <h2 class="rich_media_title">
                {{title}}
              </h2>
              <div class="head">
                <span class="rich_media_meta meta_original_tag" v-if="isOriginal==1">原创</span>
                <em class="rich_media_meta rich_media_meta_text" v-if="pubTime">{{format(pubTime)}}</em>
                <span class="rich_media_meta articleMediaName" v-on:click="showDetail">{{mediaName}}</span>
              </div>
              <div class="rich_media_content " id="js_content" v-html="html">

              </div>
              <div class="foot">
                <span>阅读</span> {{readNum>=100000 ? '100000+' : readNum}} <i class="ico-zanWx"></i> {{zanNum}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="mediaAdd_footer">
        <div class="download_bar cf">
          <img class="fl" src="../../public/img/logo2.png" alt="">
          <span class="fl">品推宝－优质媒体 自由交易</span>
          <a class="btn_dl fr" v-on:click="toDownload">立即下载</a>
        </div>
      </footer>
    </section>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>
<script>
  import $ from 'n-zepto'
  import '../../public/js/init.js'
  import utils from '../../public/js/utils'
  import share from '../../public/js/share'
  import mediaService from '../../service/mediaService.js'
  import Layer from '../../components/common/Layer'
  import  '../../public/css/style.css'
  import  '../../public/css/weixin/weixin_html.css'
  import  '../../public/css/weixin/weixin_not_in_mm2c9cd6.css'
  import  '../../public/css/weixin/weixin_page_mp_article_improve_combo3140a6.css'
  import webAppApi from '../../public/js/webAppApi.js'

  var urlHref = window.location.href;
  var pMid = '';
  var token = utils.cookie.get('pintui-token');
  var platform = '';
  if(utils.urlParam('platform')=='wx'){
    platform = '&platform=wx';
  }
  /*主动拉起APP*/
  webAppApi.pullApp('articleShow?articleUrl=' + utils.urlParam('articleUrl') + '&type=' + utils.urlParam('type') + platform);
  //如果是微博直接跳转到原地址 或者直播
  if(utils.urlParam('type')>=2){
    window.location.href = decodeURIComponent(decodeURIComponent(decodeURIComponent(utils.urlParam('articleUrl'))));
  }
  //图片处理
  parent.imgSrc = {};
  var imgIfrCount = 0;
  function showImg(url,width,height) {
    if(url.indexOf('pintuibao.cn')>=0){
      return "";
    }else{
      var id = 'imgIfr' + imgIfrCount++;
      parent.imgSrc[id] = '<img " src=\'' + url + '\' style="width:100%;height:100%; display:block;position:absolute;left:0;top:0;"/>';
      return '<iframe src="javascript:parent.imgSrc[\''+id+'\'];" frameBorder="0" scrolling="no" style="width:'+width+';height:'+height+';overflow: hidden;"></iframe>';
    }
  }
  export default {
    name: 'ArticleShow',
    components: {Layer},
    data () {
      return {
        layerMsg:'',
        title:'',
        isOriginal:'',//原创
        isAuth:'',//认证
        mediaName:'',
        pubTime:'',
        html:'',
        isMediaCollected:'',//1 媒体已收藏 2媒体未收藏
        readNum:'',//阅读数
        zanNum:'',//点赞数
        mediaImg:'',//微信头像
        coverPlan:'',//封面图
        spreadNum:'',//转发数
        commentNum:'',//评论数
        pubNum:'',//近7日
        hlavGread:''//头条均阅读
      }
    },
    created(){
      if(utils.urlParam('type')==1){
        this.postArticleDetail();
      }
    },
    methods: {
      showDetail(){
        window.location.href = 'mediaDetail.html?pMid=' + pMid +'&type=' + utils.urlParam('type') + '&plattype=' + (utils.urlParam('type')==1?1:utils.urlParam('type')==2?2:3) + platform;
      },
      toDownload(){
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb';
      },
      format(time){
        function add0(m){return m<10?'0'+m:m }
        var time = new Date(time);
        var y = time.getYear()+1900;
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        return add0(y)+'-'+add0(m)+'-'+add0(d);
      },
      postArticleDetail(){
        var data = {
          url:urlHref.indexOf('%')>-1 ?  decodeURIComponent(decodeURIComponent(decodeURIComponent(utils.urlParam('articleUrl')))) :  urlHref.substring(urlHref.indexOf('articleUrl=')+11,urlHref.indexOf('&type')),//如果未编码则截取
          type:utils.urlParam('type'),
          isNeedContent:1,
          isNeedMediaFullInfo:1
        };
        mediaService.articleDetail(data,(data)=>{
          if(!data){
            this.layerMsg = '文章获取失败，请稍后重试。';
            setTimeout(()=>{
              this.layerMsg = '';
            },2000)
            return
          }
          pMid = data.pMid;
          this.html = data.html;
          this.title=data.title;
          this.isOriginal=data.isOriginal;//原创
          this.mediaName=data.mediaName;
          this.isAuth=data.isAuth;//认证
          this.pubTime=data.pubTime;
          this.html=this.html ? data.html.replace(/(<img .*?title=)/ig,"$1''") : ' ';
          this.isMediaCollected=data.isMediaCollected;//1 媒体已收藏 2媒体未收藏
          this.readNum=data.readNum;//阅读数
          this.zanNum=data.zanNum;//点赞数
          this.mediaImg=data.mediaImg;//微信头像
          this.coverPlan=showImg(data.coverPlan,'1.2rem','.8rem');//封面图
          this.coverPlanShare = data.coverPlan;
          this.spreadNum=data.spreadNum;//转发数
          this.commentNum=data.commentNum;//评论数
          this.pubNum=data.pubNum;//近7日
          var hlavGread = data.hlavGread;
          var hlavGreadData = hlavGread / 10000;
          this.hlavGread = hlavGreadData > 1 ? parseFloat(hlavGreadData).toFixed(1) + '万' : hlavGread;//头条均阅读
          /*调用分享*/
          share.shareTx(data.title);
        },()=>{
          this.layerMsg = '获取数据失败，请稍后重试';
          setTimeout(()=>{
            this.layerMsg = '';
          },2000)
        })
      }
    },
    updated(){
      if(utils.urlParam('type') == 1){
        var content_width = $('.content').width();
        var content_paddingLeft= $('.rich_media_area_primary').css('padding-left');
        var content_innerWidth = parseInt(content_width) - parseInt(content_paddingLeft)*2;
        //查找table
        $('.content table').each(function(){
          if($(this).width()>content_innerWidth){
            $(this).width(content_innerWidth);
          }
        });
        $('.content img').each(function(){
          var $this = $(this);
          //$this.hide();//初始化时 隐藏 防止出现微信防盗链图片   隐藏后小图会出现问题，无法获取width
          var src = $this.data('src') ? $this.data('src') : $this.attr('src');
          //以下会出错 2016.10.04 怀疑是腾讯改变了规则
          /*if($(this).data('w')>content_innerWidth || !$(this).data('w')){
           $(this).after('<img src="http://img02.store.sogou.com/net/a/05/link?appid=100520091&url='+src +'">')
           $(this).next().css({width:'100%!important'});
           $(this).remove();
           }else{
           $(this).attr('src','http://img02.store.sogou.com/net/a/05/link?appid=100520091&url='+src);
           }*/
          //解决上面出现的问题，iframe
          var imgWidth = $this.width();//css 宽度
          var imgHeight = $this.height() ? $this.height() : imgWidth ;//css 宽度
          var imgTitle = $this.attr('title');//获取title
          var parentWidth=$this.parent().width();//获取父层宽度
          var zoom = 0;//缩放比例
          var imgtemp = new Image();//创建一个image对象
          imgtemp.src = src;
          imgtemp.onload = function() {//图片加载完成后执行
            var width = this.width;
            var height = this.height;
            if(imgTitle){//如果有title
              parentWidth=0;
              imgWidth=0;
            }
            if(imgWidth>0 && imgWidth<content_innerWidth){//如果图片有css宽度 并且小于文档宽度
              if (width > content_innerWidth) {
                //新加 北京迁址文章
                //http://www.pintuibao.cn/static/h5/articleShow.html?articleUrl=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMjM5Njk1MzA4Ng%3D%3D%26mid%3D2651469130%26idx%3D1%26sn%3Dde29f6f3307cdcae038f877d1bf5c41c%23rd&type=1&from=singlemessage
                zoom = content_innerWidth / width;
                height = height * zoom;
                $this.after(showImg(src, content_innerWidth + 'px!important', height + 'px!important'));
              } else {
                //新加 原因是 图片有style 边框 内边距 阴影  注意上面 文章 最后面的表情小图
                zoom = imgWidth / width;
                height = height * zoom;
                //以上
                $this.after(showImg(src, imgWidth + 'px!important', height + 'px!important'));//imgHeight 发现有图片style 后改
              }
            }else if(width<content_innerWidth){//如果图片小于文档宽度 则原尺寸输出
              if(parentWidth>0 && parentWidth!=content_innerWidth){
                //如果图片有父级宽度 则缩放比例以父级为准
                zoom = parentWidth/width;
                width = width * zoom;
                height = height * zoom;
                $this.after(showImg(src,width+'px!important',height+'px!important'));
              }else{
                //原尺寸输出
                $this.after(showImg(src,width+'px!important',height+'px!important'));
              }
            }else{//如果图片大于文档宽度 则缩放比例输出
              //如果图片有父级宽度 则缩放比例以父级为准
              if(parentWidth==0){
                zoom = content_innerWidth/width;
                width = width * zoom;
                height = height * zoom;
                $this.after(showImg(src,width+'px!important',height+'px!important'));
              }else{
                if (parentWidth > content_innerWidth) {
                  zoom = content_innerWidth / width;
                  width = width * zoom;
                  height = height * zoom;
                  $this.after(showImg(src,width+'px!important',height+'px!important'));
                } else {
                  zoom = parentWidth / width;
                  width = width * zoom;
                  height = height * zoom;
                  $this.after(showImg(src, width + 'px!important', height + 'px!important'));
                }
              }
            }
            $this.remove();
          }
        });
      }else{
        $('.content_html img').remove();
      }
      //处理链接
      $('.content a').each(function(){
        $(this).attr('href','#');
      });
      //处理腾讯视频
      // 获取视频的VID 方法
      function getUrlQueryLoc(src){
        var queryObj = {};
        if(src == '') return queryObj;
        var queryStr = src.split('?');
        if(queryStr.length <= 0) return queryObj;
        var queryTemp = queryStr[1].split('&');
        queryTemp.forEach(function(em){
          var reg = /([^=]+)=(?!=)(\S+)/;
          var temp = reg.exec(em);
          temp && (queryObj[temp[1]] = temp[2]);
        });
        return queryObj;
      }

      $('iframe').each(function () {
        if ($(this).attr('data-vidtype') || $(this).hasClass('video_iframe')) {//如果有改属性则说明是视频
          var src = $(this).data('src');
          var vid = getUrlQueryLoc(src).vid;
          var content_innerHeight = content_innerWidth * 375 / 500;
          $(this).after('' +
            '<iframe class="video_iframe" data-vidtype="2"  frameborder="0" allowfullscreen="" scrolling="no"' +
            'style="z-index: 1; width: '+content_innerWidth+'px !important;height:'+content_innerHeight+'px !important; overflow: hidden;"' +
            'data-src="https://v.qq.com/iframe/preview.html?vid=' + vid + '&amp;width='+content_innerWidth+'&amp;height='+content_innerHeight+'&amp;auto=0"' +
            'src="http://v.qq.com/iframe/player.html?vid=' + vid + '&amp;width='+content_innerWidth+'&amp;height='+content_innerHeight+'&amp;auto=0"' +
            '></iframe>'
          );
          $(this).remove();
        }
      });
      $('.content section').each(function(){
        if($(this).width()>content_innerWidth){
          $(this).width(content_innerWidth)
        }
      })
    }
  }
</script>

<style>
</style>
