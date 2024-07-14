let rec=require("../models/user");
let userdetail=require("../models/userdetail");
let productdetail=require("../models/productdetail");
let transaction=require("../models/transaction");
let bcrypt=require("bcrypt");
let rootemail;
let existingUser;
const mongoose=require('mongoose');
let jwt=require("jsonwebtoken");
const { renderFile } = require("ejs");
const user = require("../models/user");
const { query } = require("express");
const { search } = require("../router/router");
// exports.ser_registor=async(req,rep)=>
//     {   let name=req.body.name;
//         let mobile=req.body.mobile;
//         let email=req.body.email;
//         let pas=req.body.pass;
//         const salt=await bcrypt.genSalt(10);
//         const hashedpassword=await bcrypt.hash(pas,salt);
//        let re=new rec({
//         name:name,mobile:mobile,
//         email:email,password:hashedpassword
//        }); 
//        re.save();
//     };

exports.ser_login=async(req,rep)=>{
    // let emai=req.body.email;
    // let pas=req.body.pass;
    // let data=await rec.findOne({email:emai},{});
    // // console.log(data);
    // const isMatch=await bcrypt.compare(pas,data.password);
    // // console.log(isMatch);
    // if(isMatch) rep.render("dashboard",{data:data.email});
    // else rep.render("adminlogin");

    try{
        let email=req.body.email;
        let password=req.body.pass;
        rootemail=email;
        existingUser=await userdetail.findOne({email:email});
        if(!existingUser) console.log("User not Found");
        const isPasswordValid=await bcrypt.compare(password,existingUser.pass);
        if(!isPasswordValid) throw new Error("Invalid password");
        const token=jwt.sign({id:existingUser._id},process.env.SECRET_KEY);
        rep.cookie("token",token,{
            httpOnly:true,
            secure:true,
        });
        if(!token) throw new Error("Token generation failed");
        const authKeyInsertion=await userdetail.findOneAndUpdate(
            {_id:existingUser._id},
            {auth_key:token},
            {new:true}
        );
        if(!authKeyInsertion) throw new Error("Token updation failed");
         rep.render("dashboard",{data:existingUser.parent,Name:existingUser});
    }catch(error){
        console.log(error);
    }
}; 

exports.ser_registerusersave=async(req,rep)=>{
    let em=rootemail;
    let name=req.body.name;
    let email=req.body.email;
    let Id=req.body.Id;
    let bpoints=req.body.points;
    let mobile=req.body.mobile;
    let pass=req.body.pass;
    let parent=rootemail;
    let tpoints;
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(pass,salt);
    
    let ud= new userdetail({
        name:name,email:email,Id:Id,points:bpoints-(3*bpoints)/4,mobile:mobile,pass:hashedpassword,parent:em
    });
   await ud.save();
   let tr;
   let a=(3 * bpoints) / 4;
   while (parent !== "") {
    let tpoints = (3 * bpoints) / 4;//7500//5625//4218
    let parentUser = await userdetail.findOne({ email: parent }); // Get the user document //aman//tanjiro//
    if (parentUser.parent=="" || !parentUser) {
        break; // If no parent user found, break out of loop
    }
    a=a-tpoints/4;
    let update = await userdetail.updateOne({ email: parent }, { $inc: { points: tpoints/4 } });//update aman by 7500/4//update by 5625/4
    tr=new transaction({amount:tpoints/4,from:email,to:parent,type:"new registration"});
    parent = parentUser.parent; // Update parent to the parent's email for next iteration//parent me  tanjiro dal diya//parent me lucky dal diya
    bpoints = tpoints;//7500//5625
    await tr.save();
}

let updati=await userdetail.updateOne({parent:""}, { $inc: { points: a } });
    tr=new transaction({amount:a,from:email,to:"root@gmail.com",type:"new registration"});
    await tr.save()
    existingUser = await userdetail.findOne({ _id: existingUser._id });
    rep.redirect("/home");
};
exports.ser_userview=async(req,rep)=>{
    //  console.log(ema);
    //  let data=await userdetail.findOne({email:rootemail},{});
    //  console.log(data);
    let select=await userdetail.find({parent:rootemail},{});
    // console.log(select);
    
    rep.render("viewuser",{searchdata:existingUser,user:select,data:existingUser.parent,balance:existingUser.points,Name:existingUser});
}
exports.ser_addproductsave=async(req,rep)=>{
    let name=req.body.name;
    let price=req.body.price;
    let quantity=req.body.quantity;
    let ud= new productdetail({
        Product_name:name,Price:price,Quantity:quantity
    });
   await ud.save();
   rep.redirect("/home");
}
exports.ser_viewproductadmin=async(req,rep)=>{
    let select=await productdetail.find({},{});
    rep.render("viewproduct",{user:select,data:existingUser.parent,balance:existingUser.points,Name:existingUser});
}
exports.ser_update_points_data=async(req,rep)=>{
    let id=existingUser._id;
    let points=req.body.points;
    let type=req.body.type;
    if(type=='credit'){
        await userdetail.updateOne({_id:id},{$inc:{points:points}});
        rep.redirect("/home");
    }
    else{
        await userdetail.updateOne({_id:id},{$inc:{points:-points}});
        rep.redirect("/home");
    }
    existingUser = await userdetail.findOne({ _id: id });
}
exports.ser_delete_product=async(req,rep)=>{
    let id=req.body.id;
     await productdetail.deleteOne({_id:id});
     rep.redirect("/home");
 }
 exports.ser_viewproductuser=async(req,rep)=>{
    let select=await productdetail.find({},{});
    rep.render("viewproductuser",{user:select,data:existingUser.parent,balance:existingUser.points,Name:existingUser});
 }
 exports.ser_user_update_pageproduct=async(req,rep)=>{
    let id=req.body.id;
    const searchdata=await productdetail.findOne({_id:id});
    rep.render("updateproduct",{searchdata:searchdata,data:existingUser.parent,balance:existingUser.points,Name:existingUser});
 }
 exports.ser_update_service=async(req,rep)=>{
    let name=req.body.name;
    let price=req.body.Price;
    let quantity=req.body.Quantity;
    let id=req.query.id;
    //console.log(name,price,quantity,id);
    await productdetail.updateOne({_id:id},{$set:{Product_name:name,Price:price,Quantity:quantity}});
    rep.redirect("/home");
 }
 exports.ser_buy=async(req,rep)=>{
    // console.log(existingUser.parent);
    let id=req.body.id;
    // console.log(id);
    const price=await productdetail.findOne({_id:id});
    // console.log(price.Price);
    rep.render("buy",{data:existingUser.parent,id:id,price:price.Price,balance:existingUser.points,Name:existingUser});
 }
 exports.ser_buy_save=async(req,rep)=>{
    let price=req.body.Price;
    let quantity=req.body.Quantity;
    let id=req.query.id;
    let totalPointsNeeded = price * quantity;
    if(existingUser.points<totalPointsNeeded){
        rep.status(400).send("Insufficient balance");
        return;
    }
        
        let product =await productdetail.findOne({_id:id});
        let parsedQuantity = parseInt(quantity);
        if(parsedQuantity>product.Quantity){
            rep.status(400).send("Insufficient Quantity");
            return;
        }
    if (isNaN(parsedQuantity)) {
        rep.status(400).send("Invalid quantity provided");
        return;
    }
    let updatedQuantity = product.Quantity - parsedQuantity;
    let remainingPoints = existingUser.points - totalPointsNeeded;
        await userdetail.updateOne({_id:existingUser._id},{$set:{points:remainingPoints }});
        await productdetail.updateOne({_id:id},{$set: { Quantity: updatedQuantity  }});
        let bpoints=price*quantity;
        
        let parent=existingUser.parent;//tanjiro
        let tr;
        let a= bpoints;//7500
        while (parent !== "") {
         let tpoints = bpoints;//7500//5625
         let parentUser = await userdetail.findOne({ email: parent }); // tanjiro all info and tanjiro ka parent lucky ha///lucky info
         if (parentUser.parent=="" || !parentUser) {
             break; 
         }
         a=a-tpoints/4;//5625
         await userdetail.updateOne({ email: parent }, { $inc: { points: tpoints/4 } });//update tanjiro by 1875
         tr=new transaction({amount:tpoints/4,from:rootemail,to:parent,type:"product purchased"})
         parent = parentUser.parent; // update tanjiro to lucky
         tpoints=(3*bpoints)/4;
         bpoints = tpoints;//7500
         tr.save();
     }
     
     await userdetail.updateOne({parent:""}, { $inc: { points: a } });
     tr=new transaction({amount:a,from:rootemail,to:"root@gmail.com",type:"product purchased"});
     await tr.save();
     existingUser = await userdetail.findOne({ _id: existingUser._id });
     rep.redirect("/home");
    
 }
 exports.ser_update_serviceuser=async(req,rep)=>{
    let info=req.query.id;
    let name=req.body.name;
    let email=req.body.email;
    let moblie=req.body.mobile;
    let userid=req.body.Id;
    let pass=req.body.password;
    let cpass=req.body.confirm_password;
    //console.log(info,name,email,moblie,userid,pass,cpass);
     if(pass!=cpass) rep.send("confirm password doesn't match with new password");
    let isPasswordValid=await bcrypt.compare(pass,existingUser.pass);
     if(!isPasswordValid) rep.send("Wrong password");
     await userdetail.updateOne({_id: id},{$set:{name:name,email:email,Id:userid,moblie:moblie}});
     rep.send("Updated successfully");
 }
 exports.ser_adminprofile=async(req,rep)=>{
    rep.render("adminprofile",{searchdata:existingUser,data:existingUser.parent,Name:existingUser});
 }
 exports.ser_update_profile=async(req,rep)=>{

 }
 exports.ser_change_pass_page=async(req,rep)=>{
    console.log(existingUser);
    rep.render("changepass",{id:existingUser._id});
 }
 exports.ser_change_pass=async(req,rep)=>{
    let id=req.body.id;
    let oldpass=req.body.oldpass;
    let pass=req.body.pass;
    let conpass=req.body.conpass;
    const isPasswordValid=await bcrypt.compare(oldpass,existingUser.pass);
    if(!isPasswordValid) rep.send("Your password is incorrect");
    else if(oldpass==pass) rep.send("new password is same as ols one");
    else if (pass!=conpass) rep.send("new password doesn't match with confirm password");
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(pass,salt);
    await userdetail.updateOne({_id:id},{$set:{pass:hashedpassword}});
    rep.send("Password is changed");
 }
 exports.ser_home=async(req,rep)=>{
    rep.render("dashboard",{data:existingUser.parent,Name:existingUser});
 }
 exports.ser_viewshare=async(req,rep)=>{
    let select=await userdetail.find({parent:rootemail},{});
    rep.render("viewshare",{Name:existingUser,data:existingUser.parent,query:existingUser,fdata:select});
 }
 exports.ser_viewtransaction=async(req,rep)=>{
    transactio=await transaction.find({},{});
    //console.log(transactio);
    rep.render("viewtransaction",{searchdata:existingUser,Name:existingUser,data:existingUser.parent,transaction:transactio})
 }
 exports.ser_delete_user=async(req,rep)=>{
    let id=req.body.id;
     await userdetail.deleteOne({_id:id});
     rep.redirect("/home");
 }
 exports.ser_view_user_commodity=async(req,rep)=>{
    let id=req.query.id;
    console.log(id);
    let id_data=await userdetail.findOne({_id:id},{});
    console.log(id_data);
    rep.render("view_user_commodity",{data:existingUser.parent,Name:existingUser,searchdata:id_data});
 }
 exports.ser_update_points=async(req,rep)=>{
    rep.render("updatepoints",{data:existingUser.parent,Name:existingUser});
 }
 exports.ser_signout = async (req, rep) => {
    try {
      // Clear the token from the user's cookie
      rep.clearCookie("token");
      // Remove the auth key from the user's document
      await userdetail.updateOne({ _id: existingUser._id }, { $set: { auth_key: "" } });
      // Set Cache-Control header to prevent caching
      
      // Redirect to the login page
      rep.redirect("/loginp");
    } catch (error) {
      console.log(error);
    }
  };