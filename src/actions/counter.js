import {
  ADD,
  MINUS,
  GET_PAGE_SUM,
  ADD_ANSWER,
  GET_PAGE_INFO,
  ADD_TIMESTAMP,
} from '../constants/counter'

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
export const getPageInfo = (payload) => {
  return {
    type: GET_PAGE_INFO,
    payload,
  }
}
export const addTimestamp = (payload) => {
  return {
    type: ADD_TIMESTAMP,
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
