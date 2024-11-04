
import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        require:[true ,"user name is require field"],
        unique:true
    },
    email:{
        type:String,
        require:[true ,"email is require field"],
        unique:true
    },
    password:{
        type:String,
        require:[true ,"user name is require field"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
});

const User =mongoose.models.User || mongoose.model("User" ,userSchema);
export default User;