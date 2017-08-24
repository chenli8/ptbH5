import urlManager from '../public/js/urlManager'
import utils from '../public/js/utils'
export default {
  productSoldList: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aProductSoldList,
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
  commonPackageFeedback: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aCommonPackageFeedback,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  packageList: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aPackageList,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  commonListPackageFeedback: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aCommonListPackageFeedback,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  }
}
