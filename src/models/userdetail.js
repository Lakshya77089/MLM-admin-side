let mong=require("mongoose");
let sch=mong.Schema({
    name:{type:String,
        default:"",
    },
    email:{type:String,
        default:"",
    },
    Id:{
        type:Number,
        default:null,
    },
    points:{
        type:Number,
        default:null,
    },
    mobile:{
        type:Number,
        default:null,
    },
    pass:{
        type:String,
        default:"",
    },
    parent:{
        type:String,
        default:"",
    },
    auth_key:{
        type:String,
        default:"",
    }
});

module.exports=mong.model("usersdetail",sch);