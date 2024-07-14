let express=require("express");
let router=express.Router();
const user_auth=require("../user_auth")
let{cont_loginp,cont_login,cont_register_user,cont_registerusersave,cont_userview,cont_adminprofile,cont_home,cont_addproduct,cont_addproductsave,cont_update_points,
    cont_update_points_data,cont_delete_product,cont_viewproductuser,cont_viewproductadmin,cont_user_update_page,cont_update_service,cont_buy,cont_buy_save,cont_update_serviceuser,
    cont_user_update_pageproduct,cont_update_profile,cont_change_pass_page,cont_change_pass,cont_viewshare,cont_viewtransaction,cont_delete_user,cont_view_user_commodity,
    cont_signout}=require("../controller/controller");

router.get("/loginp",cont_loginp);
router.post("/login",cont_login);
router.get("/register_user",user_auth,cont_register_user);
router.post("/registerusersave",user_auth,cont_registerusersave);
router.get("/userview",user_auth,cont_userview);
router.get("/home",user_auth,cont_home);
router.get("/adminprofile",user_auth,cont_adminprofile);
router.get("/addproduct",user_auth,cont_addproduct);
router.post("/addproductsave",user_auth,cont_addproductsave);
router.get("/viewproductadmin",user_auth,cont_viewproductadmin);
router.get("/update_points",user_auth,cont_update_points);
router.post("/update_points_data",user_auth,cont_update_points_data);
router.post("/delete_product",user_auth,cont_delete_product);
router.get("/viewproductuser",user_auth,cont_viewproductuser);
router.post("/user_update_pageproduct",user_auth,cont_user_update_pageproduct);
router.post("/update_service",user_auth,cont_update_service);
router.post("/Buy",user_auth,cont_buy);
router.post("/buy_save",user_auth,cont_buy_save);
router.post("/user_update_page",user_auth,cont_user_update_page);
router.post("/update_serviceuser",user_auth,cont_update_serviceuser);
router.post("/update_profile",user_auth,cont_update_profile);
router.get("/change_pass_page",user_auth,cont_change_pass_page);
router.post("/change_pass",user_auth,cont_change_pass);
router.get("/viewshare",user_auth,cont_viewshare);
router.get("/viewtransaction",user_auth,cont_viewtransaction);
router.post("/delete_user",user_auth,cont_delete_user);
router.get("/view_user_commodity",user_auth,cont_view_user_commodity);
router.get("/signout",user_auth,cont_signout);
module.exports=router;