const mongoose=require('mongoose')
const photoschma=new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    imageURL:{
        type:String
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Photo", photoschma)