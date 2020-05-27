import '@/mock/localServer/lib.js'

import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import Choose from './pages/choose/choose'

import configStore from './store'

import '@/styles/reset.scss'
import './app.scss'

import 'taro-ui/dist/style/index.scss'
import fetch from '@/utils/request'

// 考试数据导入缓存

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/choose/choose',
      'pages/detail/detail',
      'pages/index/index',
      'pages/answerCard/answerCard',
      'pages/grade/grade',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store} value={fetch}>
        <Index />
        <Choose />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
