import { ADD, MINUS, GET_PAGE_SUM, ADD_ANSWER } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  paperSum: [],
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
