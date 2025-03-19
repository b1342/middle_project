const express=require("express")
const router =express.Router()
const postcontroller=require('../controller/postController')

router.get('/',postcontroller.getallPosts)
router.get('/:_id',postcontroller.getPostbyid)
router.post('/',postcontroller.createnewPost)
router.put('/',postcontroller.updatePost)
router.delete('/',postcontroller.deletePost)

module.exports=router