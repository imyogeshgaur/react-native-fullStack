import { Schema, model } from "mongoose";

const authSchema = new Schema({
    userName: {
        type:String,
        unique:true,
        required:false
    },
    userEmail: {
        type: String,
        required: true,
        unique:true
    },
    userPassword: {
        type: String,
        required: true
    },
    userRole:{
        type:String,
        required:true,
        default:'User'
    }
})

const Auth = model("Auth", authSchema);
export default Auth;
