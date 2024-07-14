let express=require("express");
let bodyParser = require('body-parser');
let cookieParser=require("cookie-parser");
let path = require('path');
let dotenv=require("dotenv");
let app=express();
dotenv.config();
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.set("views",path.join(__dirname,"/src/views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"/public")));
let {conDB}=require("./src/dbconnection");;
app.use("",require("./src/router/router"));
app.use(bodyParser.json());
app.listen(process.env.PORT,()=>
{
console.log("server chal gya");
});
 conDB();