import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCheckbox } from 'taro-ui'
import './question.scss'

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: [],
    }
  }

  componentWillMount() {
    this.setState({
      checkedList: this.props.answer,
    })
  }
  componentDidMount() {
    Taro.createSelectorQuery()
      // 自定义组件需要把this.$scope穿进去
      .in(this.$scope)
      .select('.question')
      .boundingClientRect((res) => {
        this.switchHeight({ index: this.props.index, height: res.height })
      })
      .exec()
  }

  handleChange = (value) => {
    this.setState({
      checkedList: value,
    })
    this.props.onChangeAnswer(this.props.questionId, value)
  }

  switchHeight = (height) => {
    this.props.onSwitchHeight(height)
  }

  render() {
    const options = this.props.checkboxOption
      ? this.props.checkboxOption.map((item, index) => ({
          value: index,
          label: item,
        }))
      : []
    return (
      <View class="question">
        <View>{this.props.title}</View>
        <AtCheckbox
          className="nolines"
          options={options}
          selectedList={this.state.checkedList}
          onChange={this.handleChange}
        ></AtCheckbox>
      </View>
    )
  }
}

export default Question
