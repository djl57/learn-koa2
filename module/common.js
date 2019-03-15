exports.getPostData = ctx => {
  // 获取异步数据
  return new Promise((resolve, reject) => {
    try {
      let str = ''
      ctx.req.on('data', chunk => {
        str+=chunk
      })
      ctx.req.on('end', chunk => {
        resolve(str)
      })
    } catch (error) {
      reject(error)
    }
  })
}