const express = require('express')
const router = express.Router()
const checkMiddleware = require('../middlewares/check')

const user_handler = require('../router_handler/user')

const contract = require('express-contract').contract
const { regUserSchema } = require('../schema/user')

// 注册新用户
router.post('/reguser', contract(regUserSchema, 'body'), checkMiddleware, user_handler.regUser)
// 登录
router.post('/login', contract(regUserSchema, 'body'), checkMiddleware, user_handler.login)

module.exports = router
