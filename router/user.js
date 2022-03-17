const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  console.log('/user/list 路由')
  res.send('用户列表')
})

router.post('/user/add', (req, res) => {
  console.log('/user/add 路由')
  // 在服务器端使用 req.body 接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('添加用户')
})

router.post('/user/update', (req, res) => {
  console.log('/user/add 路由')
  // 在服务器端使用 req.body 接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('更新用户')
})

module.exports = router
