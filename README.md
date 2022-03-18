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

## CORS 跨域资源共享

解决跨域问题的方案主要两种：

- CORS（主流的解决方案，推荐使用）
- JSONP（有缺陷的解决方案：只支持 GET 请求）

### 什么是 CORS？

CORS（Corss-Origin Resource Sharing, 跨域资源共享）由一系列 HTTP 响应头组成，这些 HTTP 决定浏览器是否阻止前端 JS 代码跨域获取资源。

浏览器的同源策略默认会阻止网页跨域获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制。

### 注意事项

- CORS 主要在服务器端配置，客户端浏览器无需做任何额外的配置，即可请求开启了 CORS 的接口。
- CORS 在浏览器中有兼容性，只有支持 XMLHttpRequest Level 2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、Firefox3.5+）

### 使用 cors 中间件解决跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便的解决跨域问题。

使用：

```javascript
// 1.安装中间件
npm install cors

// 2.导入中间件
const cors = require('cors')

// 3.配置中间件
app.use(cors())
```
