const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

const dbUrl = "mongodb://localhost:27017"

const dbName = 'koa'

const client = new MongoClient(dbUrl);

// 看性能，说明时间都浪费在连接数据库上
console.time('start')
client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // console.timeEnd('start') // 1025.670ms
  // 增加数据
  // db.collection('user').insertOne({
  //   "username": 'zyuej',
  //   "age": "48",
  //   "sex": '女',
  //   "status": '2'
  // }, (err, res) => {
  //   if (!err) {
  //     console.log('增加数据成功')
  //     client.close();
  //     // console.timeEnd('start') // 1031.798ms
  //   }
  // })

  // 查询数据
  // let result = db.collection('user').find({}) // {}表示查询全部
  // console.timeEnd('start') // 1027.447ms
  // result.toArray((err, docs) => {
  //   // console.timeEnd('start') // 1032.411ms
  //   console.log(docs) // ok，能拿到全部数据
  // })
});