const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

router
.get('/', async ctx => {
  ctx.body = '首页'
})
.get('/news', async ctx => {
  ctx.body = '新闻列表页面'
})
.get('/newscontent/:id', async ctx => {
  // 获取动态路由的传值
  console.log(ctx.params) // { id: '12' }
  ctx.body = `新闻详情${ctx.params.id}`
})
.get('/hei/:id/:aid', async ctx => {
  // 获取动态路由的传值
  console.log(ctx.params) // { id: '12', aid: '23' }
  ctx.body = `嘿${ctx.params.id}`
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
