const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const errorMiddleware = require('./middlewares/error')
const app = express()
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const config = require('./config')

// 封装统一结果处理函数 res.cc
app.use((req, res, next) => {
  res.cc = (err, status = 1, data) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
      data,
    })
  }

  next()
})

// 配置 CORS
app.use(cors())

// 挂在静态资源
// app.use(express.static('./public'))
// 挂在静态资源, 添加前缀
app.use('/public', express.static('./public'))

// 解析 application/json 格式的请求体数据中间件
// app.use(express.json())

// 解析 application/x-www-form-urlencoded 格式的请求体数据
app.use(express.urlencoded({ extended: false }))

// JWT 身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 给路由添加前缀
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', artCateRouter)

// 错误中间件
app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
