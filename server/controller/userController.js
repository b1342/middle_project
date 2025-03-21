const User=require('../models/User')

const getallusers=('/',async(req,res)=>{
    console.log("hhhhh");
    const allusers=await User.find().lean()
    res.json(allusers)
})

const getuserbyid=('/',async(req,res)=>{
    const{userid}=req.params
    if(!userid){
        return res.status(400).json({messege: "id is not required"})
    }
    else{
        const user=await User.findById(taskid).lean() 
        res.json(user)
    } 
})

const createnewuser=('/',async(req,res)=>{
    const{name,username,email,address,phone}=req.body
    if (!name||!username||!email){    
        return res.status(401).json({messege:'name & username & email are required!'})
    }
    
    const user=await User.create({name,username,email,address,phone})
    res.json(user)
    
})
 
const updateuser=('/',async(req,res)=>{
    const{_id,name,username,email,address,phone}=req.body
    console.log(req.body)
    if (!name||!username||!email){
        return res.status(403).json({messege:'name & username & email are required!'})
    }
    if(!_id)
        return res.status(400).json({messege:'cant search without _id'})
    const user=await User.findById(_id).exec() 
    if(!user){
        return res.status(403).json({messege: 'no such as user'})
    }
    user.name=name
    user.username=username
    user.email=email
    user.address=address
    user.phone=phone
    const updateuser=await user.save()
    res.json(`'${user.name}' updated`)
})

const deleteuser=('/',async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).json({messege:'user not found'})
    }
    const result=await User.deleteOne(user)
    res.json(`'${result.name}' deleted`)
})
module.exports={deleteuser,updateuser,createnewuser,getuserbyid,getallusers}   