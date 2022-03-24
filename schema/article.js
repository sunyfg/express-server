const Joi = require('joi')

const title = Joi.string().required()
const content = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
const state = Joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.addArticleSchema = Joi.object({
  title,
  content,
  cate_id,
  state,
})
