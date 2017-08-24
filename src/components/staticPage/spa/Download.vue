<template>
  <div class="download">
    <header class="bg">
      <img src="../../../public/img/logoText.png">
    </header>
    <div class="btns">
      <a class="ios" id="dlIos" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb">iPhone 版</a>
      <a class="android" id="dlAdroid" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb">Android 版</a>
    </div>
    <div class="downloadVersion"></div>
  </div>
</template>

<script>
  import $ from 'n-zepto'
  import '../../../public/js/init.js'
  import '../../../public/js/webAppApi'
  import utils from '../../../public/js/utils'

  export default {
    name: 'download',
    created(){
      var url = window.location.protocol+'//' + window.location.host;
      if(utils.urlParam('source') == 'sms'){
        webAppApi.token()
        return
      }
      // ajax请求方法
      function ajaxFunc(opts) {
        $.ajax({
          type: opts.type,
          url: opts.url,
          data: JSON.stringify(opts.data),
          contentType: 'application/json',
          success: opts.success,
          error: opts.error
        })
      };
      var defaultParams = {
        channelId: "10000",
        clientType: "ptb",
        deviceNo: "h5",
        deviceType: "android",
        resolution: window.innerWidth + '*' + window.innerHeight,
        version: "1.0.0"
      };

      ajaxFunc({
        type: 'POST',
        url: url + '/common/update',
        data: $.extend(defaultParams, {data: null}),
        success: function (res) {
          $('.downloadVersion').text('V'+res.data.version)
        },
        error: function () {
          $('.downloadVersion').text('版本号获取失败，请刷新重试')
        }
      });
    }
  }

</script>

<style scoped>
  .bg {
    width: 100%;
  }

  .bg img {
    display: block;
    width: 1.52rem;
    height: .49rem;
    margin: 1.25rem auto;
  }

  .btns {
    width: 100%;
    margin-top: 1.3rem;
  }

  .btns a {
    width: 1.0rem;
    height: .36rem;
    display: block;
    font-size: 0.18rem;
    line-height: .36rem;
    color: #fff;
    padding: .07rem .05rem .05rem 0.5rem;
    border-radius: .04rem;
    margin: 0 auto .17rem;
    background-position: .16rem .07rem;
    background-size: auto .32rem;
    background-repeat: no-repeat;
    text-decoration: none;
  }

  .btns .android {
    background-image: url(../../../public/img/android.png);
    background-color: #FF824D;
  }

  .btns .ios {
    background-image: url(../../../public/img/ios.png);
    background-color: #3396ff;
  }

  .downloadVersion {
    width: 100%;
    font-size: .14rem;
    margin: 0.66rem auto;
    color: #9B9B9B;
    text-align: center;
  }
</style>
