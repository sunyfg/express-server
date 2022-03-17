const auth = (req, res, next) => {
  console.log('auth 中间件')

  next()
}

module.exports = auth
