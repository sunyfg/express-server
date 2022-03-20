const express = require('express')
const cors = require('cors')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const userRouter = require('./router/user')
const authMiddleware = require('./middlewares/auth')
const errorMiddleware = require('./middlewares/error')
const app = express()

const secretKey = 'sunyanfeng 0515'

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
)

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

// session
// app.post('/api/login', (req, res) => {
//   if (req.body.username !== 'admin' || req.body.password !== '000000') {
//     return res.send({ status: 1, msg: '登录失败' })
//   }

//   req.session.user = req.body
//   req.session.isLogin = true

//   res.send({ status: 0, msg: '登录成功' })
// })

// app.get('/api/username', (req, res) => {
//   if (!req.session.isLogin) {
//     return res.send({ status: 1, msg: 'fail' })
//   }

//   res.send({
//     status: 0,
//     msg: 'success',
//     data: {
//       username: req.session.user.username,
//     },
//   })
// })

// app.get('/api/logout', (req, res) => {
//   req.session.destroy()

//   res.send({ status: 0, msg: '退出登录成功' })
// })

// JWT
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

app.post('/api/login', (req, res) => {
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 400, msg: '登录失败' })
  }

  const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '30s' })

  res.send({
    status: 200,
    msg: '登录成功',
    data: {
      token,
    },
  })
})
app.get('/admin/username', (req, res) => {
  console.log(req.user)
  res.send({
    status: 200,
    msg: '获取用户信息成功',
    data: req.user,
  })
})

// 挂在路由
app.use(userRouter)
// 给路由添加前缀
app.use('/api', userRouter)

// 错误中间件
app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
