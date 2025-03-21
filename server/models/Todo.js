const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    title:{
        
        type:String,
        required:true
    },
    tags:{
        type:String
    },
    complitaed:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('Todo',todoSchema)