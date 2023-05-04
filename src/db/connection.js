const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/logindb").then(()=>{
    console.log("connection is successfully ");
}).catch(()=>{
    console.log("not connected");
})