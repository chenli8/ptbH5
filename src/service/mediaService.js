import urlManager from '../public/js/urlManager'
import utils from '../public/js/utils'
export default {
  mediaDetail: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aMediaDetail,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  mediaArticleList: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aMediaArticleList,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  shareMediaListMix: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aShareMediaListMix,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  mediaAddBatchMix: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aMediaAddBatchMix,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  articleDetail: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aArticleDetail,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  h5WxJsAuth: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aH5WxJsAuth,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  }
}
