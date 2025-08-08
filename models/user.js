import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name field is required"],
        trim:true
    },
    email: {
        type:String,
        required:[true,"Email field is required"],
        unique:true,
        lowercase:true
    },
    password: {
        type:String,
        required:[true,"Password field is required"]
    },
    role: {
        type:String,
        required:false,
        lowercase:true,
        immutable:true,
        default:"user"
    }
})

export default mongoose.model("User",userSchema);