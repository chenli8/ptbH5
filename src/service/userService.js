import urlManager from '../public/js/urlManager'
import utils from '../public/js/utils'
export default {
  login: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aLogin,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  loginWpvCode: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aLoginWpvCode,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  loginWp: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aLoginWp,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  register: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aRegister,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  regVCode: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aRegVCode,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  fvCode: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aFvCode,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  },
  findPassword: (data, successCb, errorCb) => {
    utils.post(
      urlManager.aFindPassword,
      data,
      (data) => {
        successCb(data.data)
      },
      errorCb
    )
  }
}
