const Koa = require('koa')
const router = require('koa-router')()
// 引入koa-views
const views = require('koa-views')

const app = new Koa()

router.get('/', async ctx => {
  // ctx.body = '首页'
  const title = '你好ejs' // 我们现在想把title这个数据渲染到index.ejs中
  await ctx.render('index', { title })
})
router.get('/news', async ctx => {
  const arr = ['11', '2', '333', '4444']
  const content = "<h2>这是一个传过来的h2</h2>"
  const num = 123
  // ctx.body = '新闻列表页面'
  await ctx.render('news', { list: arr, content, num })
})

// 配置第三方中间件
// app.use(views('views', { extension: 'ejs' /* 应用ejs模板引擎 */ })) // index的后缀必须是ejs
app.use(views('views', {map: { html: 'ejs' }})) // 也可以这么写，index的后缀必须是html

// 写一个中间件来配置公共的数据
app.use(async (ctx, next) => {
  ctx.state = {
    username: '张三',
    age: '18'
  }
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
