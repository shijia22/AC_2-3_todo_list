// todos 模組

const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// new
router.get('/new', (req, res) => {
  return res.render('new')
})

// CRUD -> C
router.post('/', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 從資料庫找 id
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id) // 從資料庫找 id
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id) // 查詢資料
    .then((todo) => {
      // 如果成功就存資料
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`)) // 並導回首頁
    .catch((error) => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router