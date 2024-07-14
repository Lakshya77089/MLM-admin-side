let mong=require("mongoose");
let sch=mong.Schema({
    Product_name:{type:String,
        default:"",
    },
    Price:{
        type:Number,
        default:null,
    },
    Quantity:{
        type:String,
        default:"",
    },

});

module.exports=mong.model("product_detail",sch);