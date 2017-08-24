import utils from './utils'
var token = utils.cookie.get('pintui-token')
var url = window.location.protocol + '//' + window.location.host
var postApi = (host, path) => {
  return host + path + '?token=' + token + '&time=' + Math.floor(new Date().getTime() / 60000)
}
export default {
  'url': url,
    /* 登录注册 */
  'aLogin': postApi(url, '/u/login'), /* 登录 */
  'aLoginWpvCode': postApi(url, '/u/loginwpvcode'), /* 无密码登录获取验证码 */
  'aLoginWp': postApi(url, '/u/loginwp'), /* 无密码登录 */
  'aRegister': postApi(url, '/u/register'), /* 注册 */
  'aRegVCode': postApi(url, '/u/regvcode'), /* 注册获取验证码 */
  'aFvCode': postApi(url, '/u/fvcode'), /* 找回密码获取验证码 */
  'aFindPassword': postApi(url, '/u/findpassword'), /* 找回密码 */
  'aMediaDetail': postApi(url, '/media/detail'), /* 媒体详情 */
  'aMediaArticleList': postApi(url, '/media/articlelist'), /* 媒体详情 */
  'aProductSoldList': postApi(url, '/api/product/soldlist'), /* 卖家列表 */
  'aMediaAddBatchMix': postApi(url, '/u/media/addbatchmix'), /* 添加媒体 */
  'aShareMediaListMix': postApi(url, '/share/medialistmix'), /* 媒体分享列表 */
  'aArticleDetail': postApi(url, '/article/articledetail'), /* 媒体分享列表 */
  'aH5WxJsAuth': postApi(url, '/u/h5WxJsAuth'), /* 媒体分享列表 */
  'aCommonPackageFeedback': postApi(url, '/common/packageFeedback'), /* 买家通过banner提套餐需求 */
  'aPackageList': postApi(url, '/api/package/packageList'), /* 套餐筛选接口  */
  'aCommonListPackageFeedback': postApi(url, '/common/listPackageFeedback'), /* 查询买家提出的套餐需求 */
  'aCommonUpdate': postApi(url, '/common/update') ,/* 检查最新版本 */
  'aBrandDetail': postApi(url, '/api/brand/detail') ,/* 品牌详情接口  */
  'aBrandSubscribe': postApi(url, '/api/brand/subscribe') ,/* 订阅或取消订阅品牌   */
  'aBrandDataReport':postApi(url,'/api/brand/data/report')/*数据报告接口*/
}
