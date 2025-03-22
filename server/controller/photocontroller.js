const Photo=require('../models/Photo')

const getallPhotoes=('/',async(req,res)=>{
    const photos=await Photo.find().lean()
    res.json(photos)
})

const getPothosbyid=('/',async(req,res)=>{
    const id=req.parems
    const photo=await Photo.findOne(id).lean()
    if(!photo){
        return res.status(400).json({message:'not found'})
    }
    res.json(photo)
})

const createnewPhoto=('/',async(req,res)=>{
    const {title,imageURL}=req.body
    if(!title){
        return res.status(401).json({messege:'title is requred'})
    }
    const photo=await Photo.create({title,imageURL})
    res.json(photo)
})

const updatePhoto=('/',async(req,res)=>{
    const{_id,title,imageURL}=req.body
    if(!title){
            return res.status(401).json({message:'title is requred'})
        }
        if(!_id){
            return res.status(400).json({message:'cant search without _id'})}
            
        const photo=await Photo.findById(_id).exec()
        if(!photo){
            return res.status(402).json({message:'photo not found'})
        }
        photo.title=title
        photo.imageURL=imageURL
        const saver=await photo.save()
        res.json(saver)
})

const deletePhoto=('/',async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        {return res.status(400).json({message:'cant delete without _id'})}
    const photo=await Photo.findById(_id).exec()
    if(!photo){
        return res.status(402).json({message:'photo not found'})
    }
    const result=await Photo.deleteOne(photo)
    res.json(result)

})
module.exports={getallPhotoes,getPothosbyid,createnewPhoto,updatePhoto,deletePhoto}