const Todo = require('../todo') // 載入 todo model
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})
