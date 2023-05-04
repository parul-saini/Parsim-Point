

const mongoose=  require("mongoose");

const login_schema =  new mongoose.Schema({
    firstname:{
        type: String,
        require:true,
        minlength: 3,

    },
    lastname:{
        type: String,
        require:true
    },
    email:{
        type :String,
        require:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    confirmpassword:{
        type:String,
        require:true,
    }
})

// we need to create a cllection
const Register = new mongoose.model("OurUser",login_schema);

module.exports= Register;
