import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { formatDuring } from '@/utils/typeConver'
import { AtDivider, AtIcon } from 'taro-ui'

import './grade.scss'

@connect(({ counter }) => ({
  counter,
}))
class Grade extends Component {
  constructor(props) {
    super(props)
    this.state = { grade: 0 }
  }

  componentWillMount() {
    this.setState({
      grade: this.$router.params.grade,
    })
  }
  config = {
    navigationBarTitleText: '考试结束',
  }
  render() {
    const { hours, minutes, seconds } = formatDuring(
      new Date().getTime() - this.props.counter.timestamp.start,
      true
    )
    return (
      <View class="page">
        <View class="content">
          <View class="content__name">{this.props.counter.paperInfo.name}</View>
          <View
            class="content__grade"
            style={{ color: this.state.grade < 60 ? 'red' : '#ea612a' }}
          >
            {this.state.grade}分
          </View>
          <View class="content__grade">
            考试用时：{`${hours}:${minutes}:${(seconds + '').slice(0, 2)}`}
          </View>
          <AtDivider>
            <AtIcon value="check-circle"></AtIcon>
          </AtDivider>
        </View>
      </View>
    )
  }
}

export default Grade
