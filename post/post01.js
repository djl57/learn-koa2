const Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
// const common = require('../module/common')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(views('views', {map: { html: 'ejs' }}))
app.use(bodyParser())

router.get('/', async ctx => {
  await ctx.render('index02')
  // ctx.body = '首页'
})

router.get('/news', async ctx => {
  ctx.body = '新闻列表页面'
})

// 接受post提交的数据
router.post('/doAdd', async ctx => {
  // 在koa中使用原生nodejs获取表单post提交的数据
  // let data = await common.getPostData(ctx)
  // console.log(data) // username=djlun&password=jiansanyuan
  // ctx.body = data

  // 在koa中使用koa-bodyparser获取表单post提交的数据
  console.log(ctx.request.body) // {"username":"djlun","password":"123"}
  ctx.body = ctx.request.body
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
