import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { addTimestamp } from '@/actions/counter'
import './choose.scss'
import fetch from '@/utils/request'

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    onAddTimestamp(payload) {
      dispatch(addTimestamp(payload))
    },
  })
)
class Choose extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagesList: [],
    }
  }

  componentWillMount() {
    fetch({ url: '/api/getPages' }).then((res) => {
      this.setState({
        pagesList: res,
      })
    })
  }
  config = {
    navigationBarTitleText: '选择试卷',
  }

  startTest = (item) => {
    Taro.navigateTo({
      url: `/pages/detail/detail?id=${item.id}&name=${item.title}`,
      success: () => {
        this.props.onAddTimestamp({
          start: new Date().getTime(),
          total: item.limitTime * 60 * 1000,
        })
      },
    })
  }

  render() {
    const list = this.state.pagesList.map((item) => (
      <View class="list__item" key={item.id}>
        <View class="title">{item.title}</View>
        <View class="list__item--info">
          <View class="orange">本卷共{item.questionSum}题</View>
          <View class="orange">时间：{item.limitTime}分</View>
        </View>

        <AtButton
          circle
          className="button-orange"
          onClick={(e) => this.startTest(item, e)}
        >
          开始答题
        </AtButton>
      </View>
    ))
    return (
      <View class="page">
        <View class="list">{list}</View>
      </View>
    )
  }
}

export default Choose
