// 错误级别中间件
// 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
// 接收4个参数，分别是：(err, req, res, next)
// 注意：必须注册在所有路由之后
module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  console.log(err.message)

  res.cc('未知的错误！')
}
