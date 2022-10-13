const mongoose=require("mongoose");
 const formSchema=new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
    mobileNumber:{
        type:Number,
        require:true,
        unique:true
    },
    EmailId:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    Password:{
        type:String,
        require:true
    },
    ConfirmPassword:{
        type:String,
        require:true
    }
 })

 const User=new mongoose.model("userData",formSchema);
 module.exports=User;