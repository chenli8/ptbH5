/**
 * Created by Kirk liu on 2017/5/26.
 */
import utils from './utils.js'
import urlManager from './urlManager.js'
var weChatLogin = () => {
  var appid = window.location.href.indexOf('www') == -1 ? 'wxf6197b0161012a10' : 'wxb0f76fc6113708f3';
  // 判断来源平台
  var platform = '&platform='
  if (utils.urlParam('platform') === 'wx') {
    platform = '&platform=wx'
  }
  if (utils.urlParam('returnUrl')) {
    var redirectUri = encodeURIComponent(urlManager.url + '/u/h5WxAuth?returnUrl=' + encodeURIComponent(utils.urlParam('returnUrl')) + platform)
  } else {
    var redirectUri = encodeURIComponent(urlManager.url + '/u/h5WxAuth?key=' + utils.urlParam('key') + '&type=' + utils.urlParam('type') + platform + '&urlName=' + utils.urlParam('urlName'))
  }
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
}
export default weChatLogin
