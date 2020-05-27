import {
  ADD,
  MINUS,
  GET_PAGE_SUM,
  ADD_ANSWER,
  GET_PAGE_INFO,
  ADD_TIMESTAMP,
} from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  paperSum: [],
  paperInfo: {},
  timestamp: {},
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      }
    // 当前进入的试卷
    case GET_PAGE_SUM:
      return {
        ...state,
        paperSum: action.payload,
      }
    case ADD_TIMESTAMP:
      return {
        ...state,
        timestamp: action.payload,
      }
    // 获取试卷信息
    case GET_PAGE_INFO:
      return {
        ...state,
        paperInfo: action.payload,
      }
    // 没必要
    case ADD_ANSWER:
      return {
        ...state,
        paperSum: state.paperSum.forEach((item) => {
          if (item.id === action.payload.id) {
            item.answer = action.payload.answer
          }
        }),
      }
    default:
      return state
  }
}
