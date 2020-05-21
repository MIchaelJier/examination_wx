import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

import { add, minus, asyncAdd } from '@/actions/counter'

import './index.scss'

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    },
    asyncAdd() {
      dispatch(asyncAdd())
    },
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
    Taro.request({
      url: '/api/user/1',
      success: (res) => {
        console.log(res)
      },
    })
  }

  goPage = () => {
    Taro.navigateTo({
      url: '/pages/detail/detail',
    })
  }

  render() {
    return (
      <View className="index">
        <Button className="add_btn" onClick={this.props.add}>
          +
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </Button>
        <AtButton type="primary" onClick={this.goPage}>
          进入
        </AtButton>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    )
  }
}

export default Index
