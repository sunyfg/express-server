const Joi = require('joi')

const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required()

exports.regUserSchema = Joi.object({
  username,
  password,
})
