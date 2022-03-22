const db = require('../db/index')
const bcrypt = require('bcryptjs')
const config = require('../config')

exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('获取用户信息失败！')

    res.cc('获取用户信息成功！', 0, results[0])
  })
}

// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id=?'

  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('更新用户信息失败！')

    res.cc('更新用户信息成功！', 0)
  })
}

// 更新密码
exports.updatePassword = (req, res) => {
  const sql = 'select * from ev_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)

    // 判断用户是否存在
    if (results.length !== 1) return res.cc('用户不存在！')

    // 校验旧密码
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误！')

    // 更新密码 sql
    const sql = 'update ev_users set password=? where id=?'
    // 加密新密码
    const newPwd = bcrypt.hashSync(req.body.newPwd, config.salt)
    // 执行 sql 语句
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err)

      // 判断是否更新成功
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')

      res.cc('更新密码成功！', 0)
    })
  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = 'update ev_users set user_pic=? where id=?'
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('更新头像失败！')

    res.cc('更新头像成功！', 0)
  })
}
