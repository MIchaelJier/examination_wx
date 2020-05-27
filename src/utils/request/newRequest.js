import Mock from 'mockjs'
import Taro from '@tarojs/taro'
import resBack from '@/mock/localServer/resBack'

import '@/mock'

// eslint-disable-next-line import/prefer-default-export
export const newRequest = (param) => {
  const isHave = Object.keys(Mock._mocked).filter(
    (item) => Mock._mocked[item].rurl === param.url
  )
  if (isHave.length > 0) {
    return new Promise((resolve) => {
      let resSend = Mock._mocked[isHave[0]].template
      if (param.data) {
        resSend = resSend(param.data)
      }
      resolve({ data: resBack.sussess(resSend) })
    })
  } else {
    return Taro.request(param)
  }
}
