// 文章分类路由
const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const contract = require('express-contract').contract
const { addCateSchema, deleteCateSchema, getCateByIdSchema, updateCateSchema } = require('../schema/artcate')
const checkMiddleware = require('../middlewares/check')

// 查询文章分类
router.get('/cates', artcate_handler.getArtCates)

// 新增文章分类
router.post('/addcates', contract(addCateSchema), checkMiddleware, artcate_handler.addArticleCates)

// 根据 id 删除文章分类
router.post('/deletecate/:id', contract(deleteCateSchema, 'params'), checkMiddleware, artcate_handler.deleteCateById)

// 根据 id 查询文章分类
router.get('/cates/:id', contract(getCateByIdSchema, 'params'), checkMiddleware, artcate_handler.getArtCatesById)

// 更新文章分类
router.post('/updatecates', contract(updateCateSchema), checkMiddleware, artcate_handler.updateArticleCates)

module.exports = router
