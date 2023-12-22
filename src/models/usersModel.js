const  mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    email : {
        type : String,
        validate : {
            validator : (v)=>{
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message: props => `${props.value} is not a valid email number!`
        },
        required: [true, 'User email number required']
    },
    otp : {
        type : String
    }
},{timestamps:true,versionKey:false});

const usersModel = mongoose.model("users",dataSchema);

module.exports = usersModel;