const Joi = require('joi')

const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required()
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()
const avatar = Joi.string().dataUri().required()

// 登录注册-验证规则
exports.regUserSchema = Joi.object({
  username,
  password,
})

// 更新用户信息-验证规则
exports.updateUserInfoSchema = Joi.object({
  id,
  nickname,
  email,
})

// 更新密码-验证规则
exports.updatePasswordSchema = Joi.object({
  oldPwd: password,
  newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
})

// 更新头像-验证规则
exports.updateAvatarSchema = Joi.object({
  avatar,
})
