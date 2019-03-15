// db库  封装

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const config = require('./config')

// 封装db类库，这种封装方式每次查询都要连接数据库
class Db {
  static getInstance() { // 大地老师的视频中用了这个优化了1000ms，但是我这边试出来只相差0.2ms
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {
    this.dbClient = '' // 放db对象
    this.connect()
  }

  connect() { // 连接数据库
    return new Promise((resolve, reject) => {
      if (!this.dbClient) { // 没有db对象的时候才连接数据库，解决多次操作数据库多次连接的问题
        const client = new MongoClient(config.dbUrl);
        client.connect((err) => {
          assert.equal(null, err);
          if (!err) {
            console.log("Connected successfully to server");
            const db = client.db(config.dbName);
            this.dbClient = db
            resolve(this.dbClient)
            // client.close();
          } else {
            reject(err)
          }
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }

  find(collectionName, json) { // 需要传一个表名collection，和一个查询条件json
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).find(json) // 在collectionName中查找json
        result.toArray((err, docs) => {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }

  update() {

  }
}

var myDb = new Db()
// var myDb = Db.getInstance()
// console.time('start')
// myDb.find('user', { username:'djlun' }).then(data => {
//   console.log(data)
//   console.timeEnd('start') // 1024.992ms
// })
// console.time('start01')
// myDb.find('user', { username:'djlun' }).then(data => {
//   console.log(data)
//   console.timeEnd('start01') // 1024.992ms
// })

// 上面两个一起执行的话都会走!this.dbClient，还是会多次连接数据库
// 那这时应该怎么测试性能呢？用定时器
setTimeout(() => {
  console.time('start')
  myDb.find('user', { username:'djlun' }).then(data => {
    console.timeEnd('start') // 1014.175ms
  })
}, 100)

setTimeout(() => {
  console.time('start01')
  myDb.find('user', { username:'djlun' }).then(data => {
    console.timeEnd('start01') // 1005.581ms 这里和上面一样是因为连接数据库就需要1000ms，300ms之后数据库还没有连接上
  })
}, 300)

setTimeout(() => {
  console.time('start02')
  myDb.find('user', { username:'djlun' }).then(data => {
    console.timeEnd('start02') // 1.639ms
  })
}, 3000)

var myDb2 = new Db()
// var myDb2 = Db.getInstance()
setTimeout(() => {
  console.time('start03')
  myDb2.find('user', { username:'djlun' }).then(data => {
    console.timeEnd('start03') // 1.639ms
  })
}, 5000)

setTimeout(() => {
  console.time('start04')
  myDb2.find('user', { username:'djlun' }).then(data => {
    console.timeEnd('start04') // 1.639ms
  })
}, 7000)