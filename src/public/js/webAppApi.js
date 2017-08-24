/**
 * Created by Kirk liu on 2017/5/22.
 */

import utils from './utils'

  var ua = window.navigator.userAgent.toLowerCase();
  var webAppApi = {
    /*下载页面*/
    downURL: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb',
    /*app协议*/
    scheme: 'ptbxiaomi://',
    ua: ua,
    env: {
      isWx: /MicroMessenger/i.test(ua),
      isAdroid: /android/i.test(ua),
      isIos: /ipad|iphone/i.test(ua),//去掉mac 2017-01-12
      isMacintosh: /macintosh/i.test(ua),//加mac电脑 2017-01-12
      isSafari: /.*version\/([\w.]+).*(safari).*/i.test(ua)
    },
    //媒体详情
    media_detail: function (type, mediaId) {
      var obj = {
        action: "media_detail",
        mediaType: type,
        mediaId: "" + mediaId + ""
      };
      this.MainFun(obj)
    },
    //文章详情
    article_detail: function (type, articleUrl) {
      var obj = {
        action: "article_detail",
        mediaType: type,
        articleUrl: "" + articleUrl + ""
      };
      this.MainFun(obj)
    },
    //商品详情
    product_detail: function (productId) {
      var obj = {
        action: "product_detail",
        productId: "" + productId + ""
      };
      this.MainFun(obj)
    },
    //用户主页
    user_detail: function (userId) {
      var obj = {
        action: "user_detail",
        userId: "" + userId + ""
      };
      this.MainFun(obj)
    },
    //新建套餐
    new_package: function () {
      var obj = {
        action: "new_package"
      };
      this.MainFun(obj)
    },
    //套餐购买页
    package_detail: function (packageId) {
      var obj = {
        action: "package_detail",
        packageId: "" + packageId + ""
      };
      this.MainFun(obj)
    },
    //网页
    webview: function (url, title) {
      var obj = {
        action: "webview",
        url: "" + url + "",
        title: "" + title + ""
      };
      this.MainFun(obj)
    },
    //登录
    login: function () {
      var obj = {
        action: "login"
      };
      this.MainFun(obj)
    },
    //去套餐列表
    package_list: function () {
      var obj = {
        action: "package_list"
      };
      this.MainFun(obj)
    },
    //关闭当前
    close: function () {
      var obj = {
        action: "close"
      };
      this.MainFun(obj)
    },
    //token
    token: function () {
      var obj = {
        action: "token"
      };
      return this.MainFun(obj)
    },
    //host
    host: function () {
      var obj = {
        action: "host"
      };
      return this.MainFun(obj)
    },
    //联系客服
    im_admin: function () {
      var obj = {
        action: "im_admin"
      };
      this.MainFun(obj)
    },
    /*版本号比较方法*/
    versionCompare: function (ver1, ver2) {
      var version1pre = parseFloat(ver1);
      var version2pre = parseFloat(ver2);
      var version1next = ver1.replace(version1pre + ".", "");
      var version2next = ver2.replace(version2pre + ".", "");
      if (version1pre > version2pre) {
        return true;
      } else if (version1pre < version2pre) {
        return false;
      } else {
        if (version1next >= version2next) {
          return true;
        } else {
          return false;
        }
      }
    },
    /*主方法*/
    MainFun: function (obj) {
      /*首先判断 浏览器 来至哪里？*/
      if (/iphone|ipad|ipod/.test(this.ua)) {
        /*如果是IOS移动端浏览器*/
        return this.IosH5ToAppFun(obj);
      } else if (/android/.test(this.ua)) {
        /*如果是Android移动端浏览器*/
        return this.AndroidH5ToAppFun(obj);
      } else {
        /*如果是 pc 端浏览器*/
        this.PcOsBrowserH5ToAppMain();
      }
    },
    /*IOS*/
    IosH5ToAppFun: function (obj) {
      /*如果是自己的 IOS APP*/
      if (/ptbxiaomi/.test(this.ua)) {
        /*版本号对比*/
        var versionOld = this.ua.substring(this.ua.indexOf('ptbxiaomi') + 10, this.ua.length)
        if (!this.versionCompare(versionOld, '3.6.0')) {
          utils.tips('您的应用版本过低，暂不能使用此功能，请更新应用。');
          return
        }
        /* 调用原生IOS 方法  进入APP */
        function setupWebViewJavascriptBridge(callback) {
          if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
          }
          if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
          }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'https://__bridge_loaded__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
          }, 0)
        }

        return new Promise(function (resolve) {
          setupWebViewJavascriptBridge(function (bridge) {
            if (obj.action == "token" || obj.action == "host") {
              bridge.callHandler('getInfo', obj, function responseCallback(responseData) {
                resolve(responseData)
              })
            } else {
              bridge.callHandler('invokeNative', obj)
            }
          });
        })
      } else {
        /*移动端系统浏览器*/
        this.AppOsBrowserH5ToAppMain(obj);
      }
    },
    /*Android*/
    AndroidH5ToAppFun: function (obj) {
      /*如果是自己的 Android APP*/
      /* 调用原生ANDROID 方法  进入APP */
      try {
        if (obj.action == "token" || obj.action == "host") {
          return window.JSHandle.getInfo(JSON.stringify(obj))
        } else {
          window.JSHandle.invokeNative(JSON.stringify(obj));
        }
      } catch (e) {
        /*移动端系统浏览器*/
        this.AppOsBrowserH5ToAppMain(obj);
      }
    },
    /*移动端系统浏览器 主方法*/
    AppOsBrowserH5ToAppMain: function (obj) {
      if (obj.action) {
        var scheme = '';
        var arr = [];
        /*obj 转换成数组*/
        for (var name in obj) {
          var str = name + '=' + obj[name]
          arr.push(str);
        }
        if (arr.length == 1) {
          scheme = this.scheme + obj['action'];
        } else {
          var arrNew = [];
          arr.map(function (data, index) {
            if (index > 0) {
              arrNew.push(data)
            }
          });
          scheme = this.scheme + obj['action'] + '?' + arrNew.join('&');
        }
        this.AppOsBrowserH5ToAppFun(scheme, this.downURL);
      } else {
        this.AppOsBrowserH5ToAppFun(this.scheme, this.downURL)
      }
    },
    /*移动端系统浏览器 H5 拉起APP*/
    AppOsBrowserH5ToAppFun: function (scheme, downURL) {
      if (/MicroMessenger/i.test(window.navigator.userAgent.toLowerCase())) {
        window.location.href = downURL;
        return;
      }
      if (/.*version\/([\w.]+).*(safari).*/i.test(window.navigator.userAgent.toLowerCase())) {
        window.location.href = scheme;
        /*			window.setTimeout( function (){
         window.location.href = url;
         },1000);*/
        return;
      }
      try {
        // window.location.href = 'ptbxiaomi://mediaAdd';
        var ifr = document.createElement('iframe');
        ifr.src = scheme;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        /*			window.setTimeout( function (){
         window.location.href = url;
         document.body.removeChild(ifr);
         },1000)*/
      } catch (e) {
      }
    },
    /*PC端浏览器*/
    PcOsBrowserH5ToAppMain: function () {
      window.location.href = this.downURL;
    },
    /* 主动拉起APP */
    pullApp: function (scheme, url) {
      if (this.env.isWx) return;
      if (this.env.isMacintosh) return;
      if (this.env.isIos && this.env.isSafari) {
        window.location.href = this.scheme + scheme;
        /*window.setTimeout( function (){
         window.location.href = "download.html";
         },1000);*/
        return;
      }
      try {
        var ifr = document.createElement('iframe');
        ifr.src = this.scheme + scheme;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        window.setTimeout(function () {
          document.body.removeChild(ifr);
        }, 3000)
      } catch (e) {
      }
      url && (window.location.href = url);
    }
  };

export default webAppApi
