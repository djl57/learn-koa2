// db库  封装

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const config = require('./config')

// 封装db类库，这种封装方式每次查询都要连接数据库
class Db {
  constructor() {
    this.connect()
  }

  connect() { // 连接数据库
    return new Promise((resolve, reject) => {
      const client = new MongoClient(config.dbUrl);
      client.connect((err) => {
        assert.equal(null, err);
        if (!err) {
          console.log("Connected successfully to server");
          const db = client.db(config.dbName);
          resolve(db)
          // client.close();
        } else {
          reject(err)
        }
      })
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
console.time('start')
myDb.find('user', { username:'djlun' }).then(data => {
  console.log(data)
  console.timeEnd('start') // 1024.992ms
})
console.time('start01')
myDb.find('user', { username:'djlun' }).then(data => {
  console.log(data)
  console.timeEnd('start01') // 1024.992ms
})