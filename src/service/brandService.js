import urlManager from '../public/js/urlManager'
import utils from '../public/js/utils'
export default {
  aBrandDataReport: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aBrandDataReport,
      data,
      (data) => {
        successCb(data.data,data.systemDate)
      },
      errorCb
    )
  },
  aBrandDetail: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aBrandDetail,
      data,
      (data) => {
        successCb(data.data,data.systemDate)
      },
      errorCb
    )
  },
  aBrandSubscribe: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aBrandSubscribe,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  }
}
