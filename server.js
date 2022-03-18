const express = require('express')
const cors = require('cors')
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

// 添加 JSONP 接口，必须在 cors 之前配置
app.get('/api/jsonp', (req, res) => {
  // 1.得到函数的名称
  const funcName = req.query.callback
  // 2.定义要发送到客户端的数据对象
  const data = { name: 'zs', age: 20 }
  // 3.拼接出一个函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4.把拼接的字符串响应给客户端
  res.send(scriptStr)
})

// 配置 CORS
app.use(cors())

// 挂在路由
app.use(userRouter)
// 给路由添加前缀
app.use('/api', userRouter)

// 错误中间件
app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
