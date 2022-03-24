// 文章路由
const multer = require('multer')
const path = require('path')
const express = require('express')
const router = express.Router()
const article_handler = require('../router_handler/article')
// 表单校验
const contract = require('express-contract').contract
const { addArticleSchema } = require('../schema/article')
const checkMiddleware = require('../middlewares/check')

// 创建 multer 实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 创建 multer 实例对象，添加文件后缀
const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('------storage.destination------')
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename(req, file, cb) {
    console.log('------storage.filename------')
    console.log(file)
    const arr = file.originalname.split('.')
    const suffix = arr[arr.length - 1]
    const filename = file.fieldname + '-' + Math.round(Math.random() * 1e9)
    cb(null, filename + '.' + suffix)
  },
})
const upload = multer({ storage })

// 发布文章
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), contract(addArticleSchema, 'body'), checkMiddleware, article_handler.addArticle)

module.exports = router
