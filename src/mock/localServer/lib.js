import Taro from '@tarojs/taro'

// const lib = new Map()
const lib = [
  {
    id: '123',
    title: '模拟考试（基础知识一）',
    questionSum: 5,
    limitTime: 90,
    page: [
      {
        title: '为什么1',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 0,
        trueAnswer: [0],
      },
      {
        title: '为什么2',
        content: ['选择1', '选择2', '选择3', '选择4', '选择5'],
        type: 2,
        id: 1,
        trueAnswer: [0],
      },
      {
        title: '为什么3',
        content: ['选择1', '选择2', '选择3'],
        type: 1,
        id: 2,
        trueAnswer: [0],
      },
      {
        title: '为什么4',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 3,
        trueAnswer: [0],
      },
      {
        title: '为什么5',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 4,
        trueAnswer: [0],
      },
    ],
  },
  {
    id: '127',
    title: '模拟考试（基础知识二）',
    questionSum: 4,
    limitTime: 60,
    page: [
      {
        title: '为什么1',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 0,
        trueAnswer: [0],
      },
      {
        title: '为什么2',
        content: ['选择1', '选择2', '选择3', '选择4', '选择5'],
        type: 2,
        id: 1,
        trueAnswer: [0],
      },
      {
        title: '为什么3',
        content: ['选择1', '选择2', '选择3'],
        type: 1,
        id: 2,
        trueAnswer: [0],
      },
      {
        title: '为什么4',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 3,
        trueAnswer: [0],
      },
    ],
  },
  {
    id: '129',
    title: '模拟考试（专业实践能力一）',
    questionSum: 5,
    limitTime: 90,
    page: [
      {
        title: '为什么1',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 0,
        trueAnswer: [0],
      },
      {
        title: '为什么2',
        content: ['选择1', '选择2', '选择3', '选择4', '选择5'],
        type: 2,
        id: 1,
        trueAnswer: [0],
      },
      {
        title: '为什么3',
        content: ['选择1', '选择2', '选择3'],
        type: 1,
        id: 2,
        trueAnswer: [0],
      },
      {
        title: '为什么4',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 3,
        trueAnswer: [0],
      },
      {
        title: '为什么5',
        content: ['选择1', '选择2', '选择3', '选择4'],
        type: 1,
        id: 4,
        trueAnswer: [0],
      },
    ],
  },
]
Taro.setStorage({
  key: 'pages',
  data: lib,
})

// Taro.getStorage({
//   key: 'pages',
//   success: (res) => {
//     console.log({ res })
//   },
// })
