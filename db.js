var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})

db.connect()

// 查询
// db.query('SELECT * from users', (error, results) => {
//   if (error) throw error

//   console.log(results)
// })

// 新增数据
// const user = { username: 'Spider-Man', password: 'abc123' }
// const sqlStr = `insert into users (username, password) values (?, ?)`
// db.query(sqlStr, [user.username, user.password], (error, results) => {
//   if (error) return console.log(error.message)

//   if (results.affectedRows === 1) {
//     console.log('数据插入成功')
//   }
// })

// 新增数据-便捷方式
// const user = { username: 'Spider-Man2', password: 'abc456' }
// const sqlStr = `insert into users set ?`
// db.query(sqlStr, user, (error, results) => {
//   if (error) return console.log(error.message)

//   if (results.affectedRows === 1) {
//     console.log('数据插入成功')
//   }
// })

// 更新数据
// const user = { id: 6, username: 'aaa', password: '000' }
// const sqlStr = `update users set username=?, password=? where id=?`
// db.query(sqlStr, [user.username, user.password, user.id], (error, results) => {
//   if (error) return console.log(error.message)
//   console.log('----------')
//   console.log(results)
//   if (results.affectedRows === 1) {
//     console.log('更新数据成功')
//   }
// })

// 更新数据-便捷方式
// const user = { id: 6, username: 'aaaaaa', password: '666666' }
// const sqlStr = `update users set ? where id=?`
// db.query(sqlStr, [user, user.id], (error, results) => {
//   if (error) return console.log(error.message)
//   console.log('----------')
//   console.log(results)
//   if (results.affectedRows === 1) {
//     console.log('便捷更新数据成功')
//   }
// })

// 删除数据
// const sqlStr = `delete from users where id=?`
// db.query(sqlStr, 5, (error, results) => {
//   if (error) return console.log(error.message)

//   console.log(results)
//   if (results.affectedRows === 1) {
//     console.log('删除数据成功')
//   }
// })

// 标记删除
const sqlStr = `update users set status=? where id=?`
db.query(sqlStr, [1, 6], (error, results) => {
  if (error) return console.log(error.message)

  console.log(results)
  if (results.affectedRows === 1) {
    console.log('标记删除数据成功')
  }
})

db.end()
