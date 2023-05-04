const express = require("express");
const path = require("path");
const app = express();
const ejs= require("ejs");
const port = process.env.PORT || 3000;
require("./db/connection");
const Register = require("./model/userlogin");

const static_Files =path.join(__dirname,"../public");
const template_path =path.join(__dirname,"../templates/views");

app.use(express.static(static_Files));


app.set("view engine","ejs");
app.set("views",template_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/collection",(req,res)=>{
    res.render("collection");
})
app.get("/Accessories",(req,res)=>{
    res.render("Accessories");
})
app.get("/Dresses",(req,res)=>{
    res.render("Dresses");
})
app.get("/shoes",(req,res)=>{
    res.render("shoes");
})

app.get("/cart",(req,res)=>{
    res.render("cart");
})

// for data base 
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",async(req,res)=>{
    try {
      const Email= req.body.email;
      const password= req.body.password;
      //fetch the data match with that email that is enter by the user
      const user= await Register.findOne({email:Email});
     if(user!==null){
         if(user.password === password){
           const username=user.firstname;
           res.status(201).render("index",{
             name: "Hey "+username
           });  
        }else{
          res.status(400).render("login",{
            invalid:"Invalid username or password"
          });
        }

     }
     else{
          res.status(400).render("login",{
            msg:"We can't able to access your account, Please register yourself firstly"
          });     
   
    }

    } catch (error) {
      res.status(400).send(error);
    }
})


app.get("/register", (req, res) => {
  res.render("login");
})

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {

      const register_User = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
      });
      const register_done = await  register_User.save();
      res.status(201).render("login");
     }
  } catch (error) {
    // console.log(error);
    res.status(400).send(error);
  }

})


app.listen(port,()=>{
    console.log(`listening at ${port}`);
})







