let mong=require("mongoose");
let sch=mong.Schema({
    from:{type:String,
        default:"",
    },
    to:{
        type:String,
        default:"",
    },
    amount:{
        type:Number,
        default:null,
    },
    type:{
        type:String,
        default:"",
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
});

module.exports=mong.model("transaction_detail",sch);