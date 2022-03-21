const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册新用户
exports.regUser = (req, res) => {
  const user = req.body
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, user.username, (err, results) => {
    if (err) return res.cc(err)

    if (results.length > 0) {
      return res.cc('用户名被占用，请更换其它用户名！')
    }

    // TODO
    user.password = bcrypt.hashSync(user.password, 10)
    // 插入新用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: user.username, password: user.password }, (err, results) => {
      if (err) return res.cc(err)

      if (results.affectedRows !== 1) {
        return res.cc('注册用户失败，请稍后再试！')
      }

      res.cc('注册用户成功！', 0)
    })
  })
}

// 登录
exports.login = (req, res) => {
  const userinfo = req.body
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    // 判断用户是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 校验密码
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败，用户名或密码有误！')

    // 生成token
    const user = { ...results[0], password: '', user_pic: '' }
    const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    res.cc('登录成功!', 0, {
      token: 'Bearer ' + token,
    })
  })
}
