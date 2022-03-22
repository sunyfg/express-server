const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
const checkMiddleware = require('../middlewares/check')
const contract = require('express-contract').contract
const { updateUserInfoSchema, updatePasswordSchema, updateAvatarSchema } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo', contract(updateUserInfoSchema), checkMiddleware, userinfo_handler.updateUserInfo)

// 更新密码
router.post('/updatePwd', contract(updatePasswordSchema), checkMiddleware, userinfo_handler.updatePassword)

// 更新头像
router.post('/update/avatar', contract(updateAvatarSchema), checkMiddleware, userinfo_handler.updateAvatar)

module.exports = router
