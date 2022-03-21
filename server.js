const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const authMiddleware = require('./middlewares/auth')
const errorMiddleware = require('./middlewares/error')
const app = express()
const userRouter = require('./router/user')

const secretKey = 'sunyanfeng 0515'

// 配置 CORS
app.use(cors())

// 挂在静态资源
// app.use(express.static('./public'))
// 挂在静态资源, 添加前缀
app.use('/public', express.static('./public'))
// 解析JSON格式的请求体数据中间件
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(authMiddleware)
// JWT
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// app.post('/api/login', (req, res) => {
//   if (req.body.username !== 'admin' || req.body.password !== '000000') {
//     return res.send({ status: 400, msg: '登录失败' })
//   }

//   const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '30s' })

//   res.send({
//     status: 200,
//     msg: '登录成功',
//     data: {
//       token,
//     },
//   })
// })
// app.get('/admin/username', (req, res) => {
//   console.log(req.user)
//   res.send({
//     status: 200,
//     msg: '获取用户信息成功',
//     data: req.user,
//   })
// })

// 给路由添加前缀
app.use('/api', userRouter)

// 错误中间件
app.use(errorMiddleware)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
