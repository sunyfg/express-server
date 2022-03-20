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

## 身份认证

- 服务端渲染推荐使用 `Session 认证机制`
- 前后端分离推荐使用 `JWT 认证机制`

### Session 认证机制

通过 Cookie 来识别用户。

#### 工作原理

- 客户端：提交账号密码
- 服务器：将登录成功的用户信息存储在服务器的内存中，同时生成对应的 Cookie 字符串
- 浏览器自动将 Cookie 存储在当前域名下
- 客户端再次发送请求，自动携带可用的 Cookie 发送给服务器
- 服务器根据请求头中携带的 Cookie，从内存中查找对应的用户信息
- 用户的身份认证成功后，服务器针对当前用户生成特定的响应内容
- 服务器响应：把当前用户对应的页面内容响应给浏览器

#### 局限性

- Cookie 默认不支持跨域访问
- 前端跨域请求后端接口，需要做很多额外的配置

### JWT 认证机制

JWT (JSON Web Token) 是目前最流行的跨域认证解决方案。通过 Token 识别用户信息。

#### 工作原理

- 客户端：提交账号密码
- 服务器：验证账号密码
- 服务器：验证通过后，将用户的信息对象，通过加密后生成 token 字符串
- 服务器：将生成的 token 发送给客户端
- 客户端：将 token 存储在 LocalStorage 或 SessionStorage
- 客户端再次发起请求时，通过请求头的 Authorization 字段，将 token 发送给服务器
- 服务器把 token 字符串还原成用户的信息对象
- 用户的身份认证成功后，服务器针对当前用户生成特定的响应内容
- 服务器响应：把当前用户对应的页面内容响应给浏览器

#### 安装 JWT 相关的包

```js
npm i jsonwebtoken express-jwt
```

- `jsonwebtoken` 用于生成 JWT 字符串
- `express-jwt ` 用于将 JWT 字符串解析还原成 JSON 对象

### 注意

- 当不存在跨域请求的时候，推荐使用 Session 身份认证机制
- 当存在跨域请求的时候，推荐使用 JWT 身份认证机制
