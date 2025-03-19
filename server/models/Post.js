const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    body:{
        type:String
    }
    
},{
    timestamps:true
})
module.exports=mongoose.model("Post",postSchema)