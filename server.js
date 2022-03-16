const express = require('express')
const router = require('./router')
const app = express()

// 挂在静态资源
// app.use(express.static('./public'))
// 挂在静态资源, 添加前缀
app.use('/public', express.static('./public'))

// 挂在路由
app.use(router)

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
