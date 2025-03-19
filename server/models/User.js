const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        default:"aaa@gmail.com"
    },
    address:{
        type:String,
    },
    phone:{
        type:String
    }
},{
    timestamps:true
}

)

module.exports=mongoose.model('User',userSchema)//יצוא של המודל 
