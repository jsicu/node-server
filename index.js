// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
// // const cors = require('koa-cors');
// const app = new Koa();
// //导入跨域配置中间件
// const cors = require('./cors');
// //导入controller的中间件
// const controller = require('./controller');
// //导入维护表间关联关系中间件
// require('./relationship');
// //导入自动建表中间件
// const init_db = require('./init-db');

// //自动建表
// init_db.sync();


// //注册跨域请求
// app.use(cors());
// //注册post请求体解析
// app.use(bodyParser());
// //注册所有路由
// app.use(controller());
// //监听8888端口
// app.listen(8888);

/**
 * @Author: 老林头
 * @Date: 2020/06/10
 * @Explain: 服务入口
 */

const express = require('express')
const app = express()
// 数据库服务
const mysql = require('./mysql')

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

mysql.query("SELECT * FROM `world`.`city` WHERE `ID` = '10' LIMIT 0,1000", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

app.get('/test', (req, res) => {
  mysql.query("SELECT * FROM `world`.`city` WHERE `ID` = '10' LIMIT 0,10", function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.send(results)
  });
})

app.listen(8078, () => {
    console.log('服务启动')
})
