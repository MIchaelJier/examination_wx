import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Btn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <View>***{this.props.content}***</View>
  }
}

export default Btn
