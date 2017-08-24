/**
 * Created by Kirk liu on 2017/5/26.
 */
import $ from 'n-zepto'
import utils from '../../public/js/utils.js'
var initFontSize = () => {
  var innerWidth = $(window)[0].innerWidth
  var fontSize = 100 * (innerWidth / 375) + 'px'
  $('html').css('font-size', fontSize)
}
initFontSize()
$(window).resize(() => {
  initFontSize()
})
/* 百度统计 */
var _hmt = _hmt || [];
utils.insertScript('//hm.baidu.com/hm.js?163d813a156e2a8d8661d6a44862e43b');
