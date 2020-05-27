import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { Header } from './header/header'
import { connect } from '@tarojs/redux'
import { getPaperSum, getPageInfo } from '@/actions/counter'
import { Question } from './question/question'
import fetch from '@/utils/request'
import './detail.scss'

@connect(
  ({ counter }) => ({
    counter,
  }),
  (dispatch) => ({
    onGetPaperSum(payload) {
      dispatch(getPaperSum(payload))
    },
    onGetPageInfo(payload) {
      dispatch(getPageInfo(payload))
    },
  })
)
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paper: [],
      swiperHeight: [],
      current: 0,
    }
  }

  componentWillMount() {
    const params = this.$router.params
    Taro.setNavigationBarTitle({
      title: params.name,
    })
    fetch({ url: '/api/getPageDetail', payload: { id: params.id } }).then(
      (paper) => {
        // console.log(paper)
        this.setState({
          paper,
        })
        this.props.onGetPaperSum(paper)
        this.props.onGetPageInfo(params)
      }
    )
  }
  config = {
    navigationBarTitleText: '考试中...',
  }
  getSwiperHeight = ({ index, height }) => {
    // console.log(index, height)
    const swiperHeight = this.state.swiperHeight
    swiperHeight[index] = height
    this.setState({
      swiperHeight,
    })
  }
  change = (e) => {
    const current = e.target.current
    if (current === this.state.current) return
    this.setState({
      current,
    })
  }
  changeAnswer = (id, value) => {
    const paper = this.state.paper.map(
      (item) => {
        if (item.id === id) {
          item.answer = value
        }
        return item
      }

      // item.id === id ? (item.anser = value && item) : item
    )
    this.setState(
      {
        paper,
      },
      () => {
        this.props.onGetPaperSum(paper)
      }
    )
  }

  render() {
    const swiperItem = this.state.paper.map((item, index) => (
      // (index < this.state.current + 2 && index > this.state.current - 2) &&
      <SwiperItem key={item.id} class="swiperItem">
        {index < this.state.current + 2 && index > this.state.current - 2 && (
          <Question
            index={index}
            questionId={item.id}
            questionType={item.type}
            title={item.title}
            answer={item.answer}
            checkboxOption={item.content}
            onSwitchHeight={this.getSwiperHeight}
            onChangeAnswer={this.changeAnswer}
          ></Question>
        )}
      </SwiperItem>
    ))
    return (
      <View class="page">
        <Header
          currType={
            this.state.paper[this.state.current]
              ? this.state.paper[this.state.current].type
              : ''
          }
        ></Header>
        <View style="margin-top: 10px">
          <Swiper
            style={{
              height: this.state.swiperHeight[this.state.current] + 'px',
            }}
            onChange={this.change}
            current={this.state.current}
          >
            {swiperItem}
          </Swiper>
        </View>
      </View>
    )
  }
}

export default Detail
