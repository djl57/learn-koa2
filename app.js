// 引入koa
const Koa = require('koa')
// 引入koa-router模块并实例化koa-router
const router = require('koa-router')()

// 实例化koa
const app = new Koa()

// 配置路由（express不用配置，引入express就有）
router
.get('/', async ctx => { // '/'表示首页，ctx表示上下文context，包含了request和response等信息
  ctx.body = '首页' // body表示返回数据
})
.get('/news', async ctx => {
  ctx.body = '这是一个新闻页面'
})
// 启动路由
app
.use(router.routes()) // 启动路由
.use(router.allowedMethods()) // 可配置可不配置，建议配置

// 中间件
// express写法
// app.use((res,rep) => {
//   res.send('返回数据')
// })
// app.use(async ctx => {
//   // 可以在这里使用await获取其他异步方法里的数据
//   ctx.body = '返回数据'
// })

// 监听端口
app.listen(3000)
