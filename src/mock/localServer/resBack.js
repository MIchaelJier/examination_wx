class resBack {
  sussess = (data, res = { statusCode: 200 }, word = '操作成功') => {
    return {
      statusCode: res.statusCode,
      code: word,
      status: true,
      data,
    }
  }

  fail = (err, res = { statusCode: '4xx' }, word = '操作失败') => {
    return {
      statusCode: res.statusCode,
      code: word,
      status: false,
      data: err,
    }
  }
}
export default new resBack()
