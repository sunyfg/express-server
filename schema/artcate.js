const Joi = require('joi')

const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
const id = Joi.number().integer().min(1).required()

// 验证规则 - 添加分类
exports.addCateSchema = Joi.object({
  name,
  alias,
})

// 验证规则 - 删除分类
exports.deleteCateSchema = Joi.object({
  id,
})

// 验证规则 - 根据 id 查询分类
exports.getCateByIdSchema = Joi.object({
  id,
})

// 验证规则 - 更新分类
exports.updateCateSchema = Joi.object({
  id,
  name,
  alias,
})
