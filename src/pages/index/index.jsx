import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

import { add, minus, asyncAdd } from '@/actions/counter'
import fetch from '@/utils/request'

import './index.scss'
import Btn from './btn'

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
  constructor(props) {
    super(props)
    this.state = {
      user: { id: '00' },
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
    console.log(this.state.user)
  }

  goPage = () => {
    Taro.navigateTo({
      url: '/pages/detail/detail',
    })
  }

  getUser = () => {
    fetch({ url: 'http://www.yingjiechen.cn:9000/mock/20/user/login' }).then(
      (res) => {
        // console.log(res)
        this.setState(
          {
            user: res,
          },
          () => {
            console.log(this.state.user)
          }
        )
      }
    )
  }

  render() {
    return (
      <View className="index">
        {/* <Consumer>{JSON.stringify(this.context)}</Consumer> */}
        <Button className="add_btn" onClick={this.props.add}>
          +
        </Button>
        <Button className="dec_btn" onClick={this.props.dec}>
          -
        </Button>
        <Button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </Button>
        {this.state.user.id && <Btn content={this.state.user.id}></Btn>}
        <AtButton type="primary" onClick={this.goPage}>
          进入
        </AtButton>
        <AtButton type="primary" onClick={this.getUser}>
          请求
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
