let mong=require("mongoose");
let sch=mong.Schema({
    name:{type:String,
        default:"",
    },
    email:{type:String,
        default:"",
    },
    mobile:{
        type:Number,
        default:null,
    },
    password:{
        type:String,
        default:"",
    },
    auth_key:{
        type:String,
        default:"",
    }
    
});

module.exports=mong.model(process.env.DB_TABLE,sch);