const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = '首页'
})

// 会打印但是页面会显示not found
// router.get('/news', async ctx => {
//   console.log('这是新闻列表页面')
// })

// router.get('/news', async ctx => {
//   ctx.body = '新闻列表页面'
// })

// 所以现在就是要做打印之后页面也正常显示
// 路由级中间件
router.get('/news', async (ctx, next) => {
  console.log('这是新闻列表页面')
  await next()
})

router.get('/news', async ctx => {
  ctx.body = '新闻列表页面'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
