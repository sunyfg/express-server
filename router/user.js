const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  console.log('/user/list 路由')
  res.send('用户列表')
})

router.post('/user/add', (req, res) => {
  console.log('/user/add 路由')
  res.send('添加用户')
})

module.exports = router
