import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import './answerCard.scss'

@connect(({ counter }) => ({
  counter,
}))
class AnswerCard extends Component {
  goPage = (index) => {
    const pages = Taro.getCurrentPages()
    const prePage = pages[pages.length - 2]
    console.log(prePage)
    prePage.$component.setState({
      current: index,
    })
    Taro.navigateBack({
      delta: 2,
    })
  }

  render() {
    const answers = this.props.counter.paperSum.map((item, index) => (
      <Text
        onClick={(e) => this.goPage(index, e)}
        className={[
          'answerArea__round',
          item.answer ? (item.answer.length > 0 ? 'choosed' : '') : '',
        ]}
        key={item.id}
      >
        {index + 1}
      </Text>
    ))
    return (
      <View class="page">
        <View class="answerArea">{answers}</View>
      </View>
    )
  }
}

export default AnswerCard
