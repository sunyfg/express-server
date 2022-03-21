const db = require('../db/index')

// 注册新用户
exports.regUser = (req, res) => {
  const user = res.body
  if (!user.username || !user.password) {
    return res.send({ status: 1, msg: '用户信息不合法！' })
  }
  const sqlStr = 'select * from ev_users where username=?'
  db.connect()
  db.query(sqlStr, user.username, (err, results) => {
    if (err) return res.send({ status: 1, msg: err.message })

    if (results.length > 0) {
      return res.send({ status: 1, msg: '用户名被占用，请更换其它用户名！' })
    }

    // TODO
  })
  db.end()
}

// 登录
exports.login = (req, res) => {
  console.log('login ok')
  res.send('login ok')
}
