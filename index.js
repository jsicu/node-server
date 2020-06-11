/**
 * @Author: 老林头
 * @Date: 2020/06/10
 * @Explain: 服务入口
 */

var koa = require('koa')
// 注意require('koa-router')返回的是函数:
var router = require('koa-router')()
var cors = require('koa2-cors') //跨域中间件
var app = new koa()
// 数据库服务
const mysql = require('./mysql')

//设置允许跨域访问该服务.
app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

// mysql.query("SELECT * FROM `world`.`city` WHERE `ID` = '10' LIMIT 0,1000", function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
app.listen(8078, () => {
    console.log('服务启动')
})
