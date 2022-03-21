// 表单校验中间件
module.exports = (req, res, next) => {
  if (!req.compliance) return res.cc(req.violation.details[0].message)

  next()
}
