const { response } = require("express");
const productdetail = require("../models/productdetail.js");
let userdetail=require("../models/userdetail");
let{ser_registor,ser_login,ser_registerusersave,ser_userview,ser_addproductsave,ser_viewproductadmin,ser_update_serviceuser,ser_update_points_data,ser_delete_product,ser_viewproductuser,ser_user_update_pageproduct,ser_update_service,ser_buy,ser_buy_save,
    ser_adminprofile,ser_update_profile,ser_change_pass_page,ser_change_pass,ser_home,ser_viewshare,ser_viewtransaction,ser_delete_user,ser_view_user_commodity,ser_update_points,ser_signout}=require("../service/service.js");

let rootemail;
let existingUser;
exports.cont_registorp=async(req,rep)=>
    {
        rep.render("register");
    }
exports.cont_registor=async(req,rep)=>
    {
       await ser_registor(req,rep);
    }
exports.cont_loginp=async(req,rep)=>
    {
       rep.render("adminlogin");
    }
exports.cont_login=async(req,rep)=>
    {   let email=req.body.email;
        rootemail=email;
        existingUser=await userdetail.findOne({email:email});
       await ser_login(req,rep);
    }
exports.cont_register_user=async(req,rep)=>{
    // let email=req.query.data;
    //  console.log(email);
       rep.render("registeruser");
}
exports.cont_registerusersave=async(req,rep)=>{
    await ser_registerusersave(req,rep);
}
exports.cont_userview=async(req,rep)=>{
    // let email=req.query.data;
    //  console.log(email);
    await ser_userview(req,rep);
//    rep.render("viewuser",{search:req.query.data});
}
exports.cont_adminprofile=async(req,rep)=>{
    await ser_adminprofile(req,rep);
}
exports.cont_home=async(req,rep)=>{
   await ser_home(req,rep);
}
exports.cont_addproduct=async(req,rep)=>{
    // let data=req.query.data;
    // console.log(data);
    rep.render("addproduct");
}
exports.cont_addproductsave=async(req,rep)=>{
    await ser_addproductsave(req,rep);
}
exports.cont_viewproductadmin=async(req,rep)=>{
    await ser_viewproductadmin(req,rep);
}
exports.cont_update_points=async(req,rep)=>{
    await ser_update_points(req,rep);
}
exports.cont_update_points_data=async(req,rep)=>{
    // let id=req.query.id;
    // console.log(id);
    await ser_update_points_data(req,rep);
}
exports.cont_delete_product=async(req,rep)=>{
    
    await ser_delete_product(req,rep);
}
exports.cont_viewproductuser=async(req,rep)=>{
    await ser_viewproductuser(req,rep);
}
exports.cont_user_update_pageproduct=async(req,rep)=>{
    await ser_user_update_pageproduct(req,rep);
}
exports.cont_update_service=async(req,rep)=>{
    await ser_update_service(req,rep);
}
exports.cont_buy=async(req,rep)=>{
    await ser_buy(req,rep);
}
exports.cont_buy_save=async(req,rep)=>{
    await ser_buy_save(req,rep);
}
exports.cont_user_update_page=async(req,rep)=>{
    let id=req.body.id;
    let userinfo=await userdetail.findOne({_id:id});
    rep.render("update_profile",{data:existingUser.parent,searchdata:userinfo,Name:existingUser});
}
exports.cont_update_serviceuser=async(req,rep)=>{
    await ser_update_serviceuser(req,rep);
}
exports.cont_update_profile=async(req,rep)=>{
    let id=req.body.id;
    console.log(id);
    let name=req.body.name;
    let mobile=req.body.mobile;
    console.log(name,mobile);
    // await ser_update_profile(req,rep);
}
exports.cont_change_pass_page=async(req,rep)=>{
    await ser_change_pass_page(req,rep);
}
exports.cont_change_pass=async(req,rep)=>{
    await ser_change_pass(req,rep);
}
exports.cont_viewshare=async(req,rep)=>{
    await ser_viewshare(req,rep);
}
exports.cont_viewtransaction=async(req,rep)=>{
    await ser_viewtransaction(req,rep);
}
exports.cont_delete_user=async(req,rep)=>{
    await ser_delete_user(req,rep);
}
exports.cont_view_user_commodity=async(req,rep)=>{
    await ser_view_user_commodity(req,rep);
}
exports.cont_signout=async(req,rep)=>{
    await ser_signout(req,rep);
}