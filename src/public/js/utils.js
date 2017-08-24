/**
 * Created by Kirk liu on 2017/5/25.
 */
import $ from 'n-zepto'
var request = () => {
  var defaultError = (errorCode) => {
    return {result: false, statusCode: -1}
  }
  var printErrorInfo = (data, status, xhr) => {
    console.log(data)
    console.log(status)
  }
  var ajax = (url, method, data, successCB, errorCB) => {
    var dataJson = {
      channelId: '40000',
      clientType: 'ptb',
      deviceNo: '6546465465465',
      deviceType: 'h5',
      resolution: '',
      version: '4.0.0',
      data: data
    }
    $.ajax({
      type: method,
      url: url,
      cache: false,
      dataType: 'json',
      data: JSON.stringify(dataJson),
      contentType: 'application/json; charset=utf-8',
      success (data, status, xhr) {
        if (data.code === 0) {
          successCB(data, status, xhr)
        } else {
          if (errorCB != null) {
            errorCB(data, status, xhr)
          }
        }
      },
      error (data, status, xhr) {
        printErrorInfo(data, status, xhr)
        if (errorCB != null) {
          errorCB(defaultError(status), status, xhr)
        }
      }
    })
  }
  var get = (url, data, successCB, errorCB) => {
    return ajax(url, 'get', data, successCB, errorCB)
  }
  var post = (url, data, successCB, errorCB) => {
    return ajax(url, 'post', data, successCB, errorCB)
  }
  return {
    'get': get,
    'post': post
  }
}
// 截取URL参数
var urlParam = (name, url) => {
  var reg = new RegExp('.*[&\\?]' + name + '=([^&]*)(&|$)')
  var r = ''
  if (url == null) {
    r = window.location.search.match(reg)
  } else {
    r = url.match(reg)
  }
  if (r != null) return decodeURIComponent(r[1])
  return null
}
// 判断微信浏览器
var isWeiXin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (!ua.match(/MicroMessenger/i)) return false
  if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}
// cookie操作
var cookie = {
  set (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  get (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  del (name) {
    cookie.set(name, '', -1)
  }
}
// 回调地址跳转
var goReturnUrl = () => {
  window.location.href = decodeURIComponent(urlParam('returnUrl'))
}
// 是否是手机号
var isMobile = (val) => {
  var mobleReg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return mobleReg.test(val)
}
// 是否是邮箱
var isEmail = (val) => {
  var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return re.test(val)
}
var insertScript = (url) => {
  var hm = document.createElement('script');
  hm.src = url;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s)
}
var getScript = (url, callback) => {
  var head = document.getElementsByTagName('head')[0],
    js = document.createElement('script');

  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', url);

  head.appendChild(js);

  //执行回调
  var callbackFn = function () {
    if (typeof callback === 'function') {
      callback();
    }
  };

  if (document.all) { //IE
    js.onreadystatechange = function () {
      if (js.readyState == 'loaded' || js.readyState == 'complete') {
        callbackFn();
      }
    }
  } else {
    js.onload = function () {
      callbackFn();
    }
  }
}
var tips = (str) => {
  $('body').append('<div id="tips" style="width: auto;padding:.22rem .2rem;position: fixed;font-size:.15rem;line-height: .20rem;top:35%;left:50%;color:#fff;border-radius: .06rem;text-align: center;background-color: #000; -webkit-transform:translate(-50%,-50%); -webkit-transform:-webkit-translate(-50%,-50%);z-index: 1001;opacity: 0.8;">' + str + '</div>')
  setTimeout(() => {
    $('#tips').remove()
  }, 2000)
}
var DateFormat = (time, str) => {
  var separator = str.indexOf('/') != -1 ? '/' : '-';
  var add0 = (m) => {
    return m < 10 ? '0' + m : m
  }
  var time = new Date(time);
  var y = time.getYear() + 1900;
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  switch (str) {
    case 'YYYY/MM/DD':
      return add0(y) + separator + add0(m) + separator + add0(d);
      break;
    case 'YYYY/MM/DD HH:mm':
      return add0(y) + separator + add0(m) + separator + add0(d) + ' ' + h + ':' + mm;
      break;
    case 'MM/DD':
      return add0(m) + separator + add0(d);
      break;
    default:
      return add0(y) + separator + add0(m) + separator + add0(d);
  }
}
export default {
  'get': request().get,
  'post': request().post,
  'urlParam': urlParam,
  'isWeiXin': isWeiXin,
  'cookie': cookie,
  'goReturnUrl': goReturnUrl,
  'isMobile': isMobile,
  'isEmail': isEmail,
  'insertScript': insertScript,
  'tips': tips,
  'DateFormat': DateFormat,
  'getScript': getScript
}
