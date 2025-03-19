const express=require("express")
const router=express.Router()
const usercontroller=require('../controller/userController')

router.get('/',usercontroller.getallusers)
router.get('/:userid',usercontroller.getuserbyid)
router.post('/',usercontroller.createnewuser)
router.put('/',usercontroller.updateuser)
router.delete('/:id',usercontroller.deleteuser)

module.exports=router