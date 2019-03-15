const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = '首页'
})

router.get('/news', async ctx => {
  console.log('3、这是新闻02')
  ctx.body = '新闻列表页面'
})

app.use(async (ctx, next) => {
  console.log('1、这是第一个中间件01') // 当访问http://localhost:3000/news 时 1、匹配路由之前先到中间件，先打印 这是一个中间件01
  await next() // 2、匹配上news路由 然后打印 这是新闻02

  // 错误处理中间件
  if (ctx.status == 404) { // 如果页面找不到
    ctx.status = 404
    console.log('5、又回到第一个中间件')
    ctx.body = '这是一个404页面'
  } else {
    console.log('5、又回到第一个中间件'+ctx.url) // 3、匹配路由完成后又回到中间件继续执行 最后打印 /news
  }
})

app.use(async (ctx, next) => {
  console.log('2、这是第二个中间件02') // 当访问http://localhost:3000/news 时 1、匹配路由之前先到中间件，先打印 这是一个中间件01
  await next() // 2、匹配上news路由 然后打印 这是新闻02

  console.log('4、又回到第二个中间件')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
