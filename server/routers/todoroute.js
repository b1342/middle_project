const todocontroller=require('../controller/todocontroller')
const exress=require('express')
const router=exress.Router()

router.get('/',todocontroller.getallTodos)
router.get('/:todoid',todocontroller.getTodobyid)
router.post('/',todocontroller.createTodo)
router.put('/',todocontroller.updateTodo)
router.delete('/',todocontroller.deleteTodo)

module.exports=router