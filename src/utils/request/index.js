import Taro from '@tarojs/taro'
import { newRequest } from './newRequest'

const CODE_SUCCESS = 200
const CODE_AUTH_EXPIRED = 401
/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true } = options
  // const token = await getStorage('token')
  // const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  const header = {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return newRequest({
    url,
    method,
    data: payload,
    header,
  })
    .then(async (res) => {
      const { statusCode, data } = res.data
      if (statusCode !== CODE_SUCCESS) {
        if (statusCode === CODE_AUTH_EXPIRED) {
          // do something
        }
        return Promise.reject(res.data)
      }

      return data
    })
    .catch((err) => {
      const defaultMsg =
        err.statusCode === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || defaultMsg,
          icon: 'none',
        })
      }

      return Promise.reject(err)
    })
}
