const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
// 假设有100个路由，现在想实现一个功能，在进入任何一个路由之前都打印一下当前日期
// 应用级中间件
app.use(async (ctx, next) => { // 参数只写一个回调函数，说明匹配所有路由
  // ctx.body = '这是一个中间件'
  console.log(new Date())
  await next() // dang当前路由匹配完成以后继续向下匹配，如果不写next这个路由被匹配之后就不继续向下匹配
})

router
.get('/', async ctx => {
  ctx.body = '首页'
})
.get('/news', async ctx => {
  ctx.body = '新闻列表页面'
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
