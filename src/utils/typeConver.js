/**
 * 时间戳 转 时分秒
 * @param { timestamp }
 * @param { Bollean } 是否补0回传String
 * return Object
 */
export const formatDuring = (mss, isFix) => {
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = (mss % (1000 * 60)) / 1000
  if (isFix) {
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
  }
  return { hours, minutes, seconds }
}
