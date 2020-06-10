
const express = require('express')
const app = express()
const mysql = require('mysql')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: '3306',
  database: "world"
})

db.connect( err => {
  if (err) throw err
  console.log('数据库连接成功!')
})
db.query("SELECT * FROM `world`.`city` WHERE `ID` = '10' LIMIT 0,1000", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

app.get('/', (req, res) => {
  db.query("SELECT * FROM `world`.`city` LIMIT 0,10", function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})

app.listen(8078, () => {
    console.log('服务启动')
})
