const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
// const common = require('../module/common')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa()

app.use(views('views', {map: { html: 'ejs' }}))
app.use(bodyParser())
app.use(static('static')) // 可以配置多个，在static找不到去public中找，public中还找不到就next()
app.use(static('public'))

router.get('/', async ctx => {
  await ctx.render('index02')
  // ctx.body = '首页'
})

router.get('/news', async ctx => {
  ctx.body = '新闻列表页面'
})

// 接受post提交的数据
router.post('/doAdd', async ctx => {
  console.log(ctx.request.body) // {"username":"djlun","password":"123"}
  ctx.body = ctx.request.body
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
