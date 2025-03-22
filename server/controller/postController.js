const Post=require("../models/Post")

const getallPosts=('/',async(req,res)=>{
    const allposts=await Post.find().lean()
    res.json(allposts)
})

const getPostbyid=('/',async(req,res)=>{
    const id=req.params
    const post=await Post.findById(id).lean()
    if(!post){
        return res.status(400).json({message:'post not found'})
    }
    res.json(post)
})

const createnewPost=('/',async(req,res)=>{
    const {title,body}=req.body
    if(!title){
        return res.status(401).json({messege:'title is requred'})
    }
    const post=await Post.create({title,body})
    res.json(post)
})

const updatePost=('/',async(req,res)=>{
    const {_id,title,body}=req.body
    if(!title){
        return res.status(401).json({message:'title is requred'})
    }
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
        
    const post=await Post.findById(_id).exec()
    if(!post){
        return res.status(402).json({message:'post not found'})
    }
    post.title=title
    post.body=body
    const savepost=await post.save()  
    res.json(savepost)  
})

const deletePost=('/',async(req,res)=>{
    const {_id}=req.body
    if(!_id)
        {return res.status(400).json({messege:'cant delete without _id'})}
    const post=await Post.findById(_id).exec()
    if(!post){
        return res.status(402).json({messege:'post not found'})
    }
    const result=await Post.deleteOne(post)
    res.json(result)

})
module.exports={getallPosts,getPostbyid,createnewPost,updatePost,deletePost}