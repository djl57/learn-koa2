const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const render = require('koa-art-template')
const path = require('path')
const session = require('koa-session');

const app = new Koa()

app.use(bodyParser())
app.use(static('static')) // 可以配置多个，在static找不到去public中找，public中还找不到就next()
app.use(static('public'))

render(app, {
  root: path.join(__dirname, '../views'), // 视图的位置
  extname: '.html', // 后缀名
  debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

app.keys = ['some secret hurr']; /* cookie的签名 */
const CONFIG = {
  key: 'koa:sess', /* 默认 */
  maxAge: 10000, /* cookie的过期时间，需要配置 */
  autoCommit: true,
  overwrite: true, /* 默认 */
  httpOnly: true, /* 表示只有服务器端可以获取cookie */
  signed: true, /* 默认 签名 */
  rolling: false, /* 每次请求都强制设置session，快过期的时候用户在操作（这个操作暂时是指刷新页面或进入其他获取session的页面）时强制设置session */
  renew: true, /* 当它快过期的时候重新配置，和上面那个rolling一个意思 */
};
app.use(session(CONFIG, app));

router.get('/login', async ctx => {
  // 设置session
  ctx.session.userInfo = 'zhangsan'
  ctx.body = '登陆成功'
})

router.get('/', async ctx => {
  // 获取session
  console.log(ctx.session.userInfo)
  let list = {
    name: ctx.session.userInfo,
    age: 18,
    grade: '二班'
  }
  await ctx.render('index03', {
    list
  })
  // ctx.body = '首页'
})

router.get('/news', async ctx => {
  console.log(userInfo) // djlun
  await ctx.render('news03')
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
