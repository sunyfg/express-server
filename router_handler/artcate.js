// 文章分类路由处理函数
const db = require('../db/index')

exports.getArtCates = (req, res) => {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)

    res.cc('查询文章分类成功！', 0, results)
  })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
  const { name, alias } = req.body
  const sql = 'select * from ev_article_cate where name=? or alias=?'
  db.query(sql, [name, alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称和别名都被占用！')
    if (results.length === 1) {
      if (results[0].name === name && results[0].alias === alias) return res.cc('分类名称和别名都被占用！')
      if (results[0].name === name) return res.cc('分类名称都被占用！')
      if (results[0].alias === alias) return res.cc('分类别名都被占用！')
    }
    // 执行新增
    const sql = 'insert into ev_article_cate set ?'
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增分类失败！')
      res.cc('新增分类成功！', 0)
    })
  })
}

// 删除文章分类
exports.deleteCateById = (req, res) => {
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

    res.cc('删除文章分类成功！', 0)
  })
}

// 根据 id 获取文章分类数据
exports.getArtCatesById = (req, res) => {
  const sql = 'select * from ev_article_cate where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('查询文章分类失败！')

    res.cc('查询文章分类成功！', 0, results[0])
  })
}

// 更新文章分类
exports.updateArticleCates = (req, res) => {
  const { id, name, alias } = req.body
  const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
  db.query(sql, [id, name, alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称和别名都被占用！')
    if (results.length === 1) {
      if (results[0].name === name && results[0].alias === alias) return res.cc('分类名称和别名都被占用！')
      if (results[0].name === name) return res.cc('分类名称都被占用！')
      if (results[0].alias === alias) return res.cc('分类别名都被占用！')
    }
    // 执行更新操作
    const sql = 'update ev_article_cate set ? where id=?'
    db.query(sql, [req.body, id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}
