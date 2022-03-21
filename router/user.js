const express = require('express')
const router = express.Router()

const user_handler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', user_handler.regUser)
// 登录
router.post('/login', user_handler.login)

module.exports = router
