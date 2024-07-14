require("dotenv").config();
const jwt =require("jsonwebtoken");
const userModel=require("./models/userdetail");
//MIDDLEWARE FOR HANDLING AUTH
async function user_auth(req,res,next){
    //IMPLEMENT USER AUTH LOGIC
    try{
        if(req.cookies.token!=undefined && req.cookies.token!=""){
            const token=req.cookies.token;
            const jwtPassword=process.env.SECRET_KEY;
            const decode=jwt.verify(token,jwtPassword);
            let user=await userModel.findOne({_id:decode.id});
        if(!user) return res.status(403).json({msg:"User not found"});
        req.user=user;
        next();
        }
        else{
            res.redirect("/loginp");
            console.log("Please Login First");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Internal Server Error",
            Message:err.message,
        });
    }
}
module.exports=user_auth;