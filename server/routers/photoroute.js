const express=require('express')
const router=express.Router()
const photocontroller=require('../controller/photocontroller')

router.get('/',photocontroller.getallPhotoes)
router.get('/:id',photocontroller.getPothosbyid)
router.post('/',photocontroller.createnewPhoto)
router.put('/',photocontroller.updatePhoto)
router.delete('/',photocontroller.deletePhoto)

module.exports=router