# Express 服务器

## nodemon

`nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.`

修改文件后，自动重启服务。

### Usage

```sh
nodemon [your node app]
```

## 路由

通过 express.Router() 添加创建路由对象

```javascript
// router.js
const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  res.send('用户列表')
})
router.post('/user/add', (req, res) => {
  res.send('添加用户')
})

module.exports = router
```

## 中间件

- 应用级中间件
- 路由级中间件
- 错误级中间件
- 内置中间件
- 第三方中间件

### 应用级中间件

通过 app.use() 或 app.get() 或 app.post(), 绑定在 app 实例上的中间件，叫做应用级中间件

```javascript
// 应用级中间件(全局中间件)
app.use((req, res, next) => {
  next()
})

// 应用级中间件(局部中间件)
app.get('/', mw, (req, res) => {
  res.send('Home Page.')
})
```

### 路由级中间件

绑定在 express.Router() 实例上的中间件，叫做路由级中间件。

```javascript
let app = express()
let router = express.Router()

router.use((req, res, next) => {
  next()
})

app.use('/', router)
```

### 错误级中间件

专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题，接收 4 个参数，分别是：(err, req, res, next)。
注意：必须注册在所有路由之后。

```javascript
// 路由信息
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error: ' + err.message)
})
```

### 内置中间件

Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件。

- express.static 快速托管静态资源的内置中间件（无兼容性）
- express.json 解析 JSON 格式的请求体数据（有兼容性，4.16.0+ 版本可用 ）
- express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，4.16.0+ 版本可用 ）

```javascript
// 解析 application/json 格式的请求体数据中间件
app.use(express.json())
// 解析 application/x-www-form-urlencoded 格式的请求体数据中间件
app.use(express.urlencoded({ extended: false }))
```

### 第三方中间件

非 Express 官方内置的，而是由第三方开发的中间件。

- npm install [第三方中间件] 安装第三方中间件
- require('第三方中间件') 引入第三方中间件
