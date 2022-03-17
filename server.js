const express = require('express')
const userRouter = require('./router/user')
const authMiddleware = require('./middlewares/auth')
const errorMiddleware = require('./middlewares/error')
const app = express()

// 挂在静态资源
// app.use(express.static('./public'))
// 挂在静态资源, 添加前缀
app.use('/public', express.static('./public'))

// 解析JSON格式的请求体数据中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(authMiddleware)

// 挂在路由
app.use(userRouter)
// 给路由添加前缀
app.use('/api', userRouter)

// 错误中间件
app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
