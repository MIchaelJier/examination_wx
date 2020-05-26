import { ADD, MINUS, GET_PAGE_SUM, ADD_ANSWER } from '../constants/counter'

export const add = () => {
  return {
    type: ADD,
  }
}
export const minus = () => {
  return {
    type: MINUS,
  }
}
export const getPaperSum = (payload) => {
  return {
    type: GET_PAGE_SUM,
    payload,
  }
}
export const addAnswer = (payload) => {
  return {
    type: ADD_ANSWER,
    payload,
  }
}

// 异步的action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
