import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    profilePicture:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male", "female"]
    }
},{timestamps:true});

export const Transaction = mongoose.model("User", schema);