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
.get('/newscontent', async ctx => { // 新闻列表页面跳转到新闻详情的时候，传递一个新闻id
  // 1、从ctx中读取新闻id
  console.log(ctx.query) // 获取的是对象{ id: '123' } 推荐
  console.log(ctx.querystring) // 获取的是一个字符串 'id=123'
  // 2、从ctx里面的request里面获取get传值
  console.log(ctx.request)  // { method: 'GET',
                            // url: '/newscontent?id=123',
                            // header:
                            //  { host: 'localhost:3000',
                            //    connection: 'keep-alive',
                            //    'cache-control': 'max-age=0',
                            //    'upgrade-insecure-requests': '1',
                            //    'user-agent':
                            //     'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                            //    accept:
                            //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                            //    'accept-encoding': 'gzip, deflate, br',
                            //    'accept-language': 'zh-CN,zh;q=0.9',
                            //    cookie: '_ga=GA1.1.1361259902.1546830357' } }
  console.log(ctx.request.url) // /newscontent?id=123
  console.log(ctx.request.query) // { id: '123' }
  console.log(ctx.request.querystring) // id=123
  ctx.body = '新闻详情'
  
})

app
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
