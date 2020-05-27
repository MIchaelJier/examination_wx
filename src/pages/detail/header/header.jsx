import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCountdown, AtButton, AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './header.scss'
import { formatDuring } from '@/utils/typeConver'
import fetch from '@/utils/request'
// addTimestamp
@connect(({ counter }) => ({
  counter,
}))
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countTime: { hours: 0, minutes: 0, seconds: 0 },
      timeFormat: { hours: ':', minutes: ':', seconds: '' },
      isOpened: false,
    }
  }
  componentWillMount() {
    this.getCountTime()
  }

  componentDidShow() {
    this.getCountTime()
  }

  getCountTime = () => {
    // 显示该页时获取试卷时间
    const leaveTime =
      this.props.counter.timestamp.total -
      (new Date().getTime() - this.props.counter.timestamp.start)

    const { hours, minutes, seconds } = formatDuring(leaveTime, false)
    // console.log(formatDuring(leaveTime, false))
    if (hours === 0 && minutes === 0 && seconds === 0) {
      this.checkAnswer()
    } else {
      this.setState({
        countTime: { hours, minutes, seconds: ~~seconds },
      })
    }
  }

  goAnswerCard = () => {
    Taro.navigateTo({
      url: '/pages/answerCard/answerCard',
    })
  }

  handPage = () => {
    const list = this.props.counter.paperSum
    if (!list.every((item) => (item.answer ? item.answer.length > 0 : ''))) {
      this.controlModal(true)
    } else {
      this.checkAnswer()
    }
  }
  checkAnswer = () => {
    const id = this.props.counter.paperInfo.id
    const list = this.props.counter.paperSum
    fetch({ url: '/api/checkAnswer', payload: { id, list } }).then((res) => {
      Taro.redirectTo({
        url: `/pages/grade/grade?grade=${res}`,
      })
    })
  }
  controlModal = (state) => {
    this.setState({
      isOpened: state,
    })
  }

  render() {
    const { hours, seconds, minutes } = this.state.countTime
    return (
      <View class="headerBar">
        <AtModal
          isOpened={this.state.isOpened}
          title="您还没有全部答完，是否提交？"
          cancelText="取消"
          confirmText="确认"
          onCancel={() => this.controlModal(false)}
          onConfirm={this.checkAnswer}
        ></AtModal>
        <Text class="headerBar__title">
          {this.props.currType === 1 ? '单选题' : '多选题'}
        </Text>
        <View class="headerBar__right">
          <AtCountdown
            format={this.state.timeFormat}
            hours={hours}
            seconds={seconds}
            minutes={minutes}
            className="time-gray"
            onTimeUp={this.checkAnswer}
          />
          <AtButton
            circle
            className="button button-black"
            onClick={this.goAnswerCard}
          >
            答题卡
          </AtButton>
          <AtButton
            circle
            className="button button-orange"
            onClick={this.handPage}
          >
            交卷
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Header
