const Todo = require("../models/Todo")

const getallTodos = ('/', async (req, res) => {
    const alltodos = await Todo.find().lean().sort({_id:1})
    res.json(alltodos)
})

const getTodobyid = ('/', async (req, res) => {
    const { todoid } = req.params
    if (!todoid) {
        return res.status(404).json({ message: 'id is not defind' })
    }
    const todo = await Todo.findById(todoid).lean()
    res.json(todo)
})

const createTodo = ('/', async (req, res) => {
    const { title, tags, complete } = req.body
    if (!title) {
        return res.status(400).json({ message: 'title is required' })
    }
    const todo = await Todo.create({ title, tags, complete })
    res.json(todo)
})


const updateTodo = ('/', async (req, res) => {
    const { _id, title, tags, complitaed } = req.body
    if (!title) {
        return res.status(401).json({ message: 'title is requred' })
    }
    if (!_id) {
        return res.status(400).json({ message: 'cant search without _id' })
    }
    const todo = await Todo.findById(_id).exec()
    if (!todo) {
        return res.status(400).json({ message: 'todo not found' })
    }
    todo.title = title
    todo.tags = tags
    todo.complitaed = complitaed
    const savetodo = await todo.save()
    res.json(savetodo)
})

const deleteTodo = ('/', async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(401).json({ message: 'cant search without _id' })
    }
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(402).json({ message: 'todo not found' })
    }
    const deleted = await Todo.deleteOne(todo)
    res.json('delited!')
})

const updatecomplete = ('/', async (req, res) => {
    const { id } = req.params
    if(!id){
        return res.status(401).json({ message: 'cant search without _id' })
    }
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: 'todo not found' })
    }
    todo.complitaed = (!todo.complitaed) 
    const savetodo = await todo.save()
    res.json(savetodo)
})
module.exports = { getallTodos, getTodobyid, createTodo, updateTodo, deleteTodo ,updatecomplete}