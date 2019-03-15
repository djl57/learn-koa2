const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const render = require('koa-art-template')
const path = require('path')
const DB = require('../module/db')

const app = new Koa()

app.use(bodyParser())
app.use(static('static')) // 可以配置多个，在static找不到去public中找，public中还找不到就next()
app.use(static('public'))

render(app, {
  root: path.join(__dirname, '../views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

router.get('/', async ctx => {
  const result = await DB.find('user', {})
  // let list = {
  //   name: '张三',
  //   age: 18,
  //   grade: '二班'
  // }
  await ctx.render('index03', {
    list: result[0]
  })
  // ctx.body = '首页'
})

router.get('/news', async ctx => {
  await ctx.render('news03')
  // ctx.body = '新闻列表页面'
})

router.get('/add', async ctx => {
  let result = await DB.insert('user', {"username": "即", "age": "12", "sex": "女0", "status":"0"})
  console.log(result.result.ok) // 等于1就是成功
  // await ctx.render('add')
  // ctx.body = '新闻列表页面'
})

router.get('/edit', async ctx => {
  let result = await DB.update('user', {"username": "dyong"}, {"username": "lliuy"})
  console.log(result.result.ok) // 等于1就是成功
  // await ctx.render('add')
  // ctx.body = '新闻列表页面'
})

router.get('/delete', async ctx => {
  let result = await DB.remove('user', {"username": "lliuy"})
  console.log(result.result.ok) // 等于1就是成功
  // await ctx.render('add')
  // ctx.body = '新闻列表页面'
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
