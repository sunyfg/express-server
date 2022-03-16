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
