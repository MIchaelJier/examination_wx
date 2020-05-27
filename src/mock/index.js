import Mock from 'mockjs'
import Taro from '@tarojs/taro'

const pages = Taro.getStorageSync('pages')
const pagesMap = new Map()
pages.forEach((item) => {
  pagesMap.set(item.id, item)
})

// local mock
Mock.mock(
  '/api/getPages',
  'get',
  pages.map((item) => {
    const { id, limitTime, questionSum, title } = item
    return { id, limitTime, questionSum, title }
  })
)
Mock.mock('/api/getPageDetail', 'get', (param) =>
  pagesMap.get(param.id).page.map((item) => {
    const { title, content, type, id } = item
    return { title, content, type, id }
  })
)
Mock.mock('/api/checkAnswer', 'post', (param) => {
  const paper = pagesMap.get(param.id)
  let trueFlag = 0
  paper.page.forEach((item, index) => {
    const yourAnswer = param.list[index].answer
    if (item.trueAnswer + '' === yourAnswer + '') {
      trueFlag++
    }
  })
  const grade = Math.round((100 / paper.questionSum) * trueFlag)
  const history = Taro.getStorageSync(param.id)
  const newData = { grade, time: new Date().getTime() }
  console.log(history)
  Taro.setStorage({
    key: param.id,
    data: history ? [...history, newData] : [newData],
  })
  return grade
})
Mock.mock('/api/getGradeHistory', 'get', (param) =>
  Taro.getStorageSync(param.id)
)
