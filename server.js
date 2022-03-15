const express = require('express')

const app = express()

// 挂在静态资源
// app.use(express.static('./public'))
// 挂在静态资源, 添加前缀
app.use('/public', express.static('./public'))

app.get('/user', (req, res) => {
  res.send({ name: 'zhangsan', age: 20, sex: 'nan' })
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})

// req.query 获取 url 中的参数 如：?name=zs
app.get('/', (req, res) => {
  res.send(req.query)
})
// req.params 获取 url 中的动态参数
app.get('/user/:id/:name', (req, res) => {
  res.send(req.params)
})

app.listen(8080, () => {
  console.log('listening http://localhost:8080')
})
