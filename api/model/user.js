import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:""
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    requestSent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    requestReceived:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

export default User;