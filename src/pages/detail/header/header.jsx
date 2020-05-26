import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCountdown, AtButton } from 'taro-ui'
import './header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countTime: { hours: 2, minutes: 0, seconds: 0 },
      timeFormat: { hours: ':', minutes: ':', seconds: '' },
    }
  }

  goAnswerCard = () => {
    Taro.navigateTo({
      url: '/pages/answerCard/answerCard',
    })
  }

  render() {
    const { hours, seconds, minutes } = this.state.countTime
    return (
      <View class="headerBar">
        <Text class="headerBar__title">单选题</Text>
        <View class="headerBar__right">
          <AtCountdown
            format={this.state.timeFormat}
            hours={hours}
            seconds={seconds}
            minutes={minutes}
            className="time-gray"
          />
          <AtButton circle className="button-black" onClick={this.goAnswerCard}>
            答题卡
          </AtButton>
          <AtButton circle className="button-black button-orange">
            交卷
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Header
