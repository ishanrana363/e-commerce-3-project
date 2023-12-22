const  mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        requird : true,
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const cartsModels = mongoose.model("carts",dataSchema);

module.exports = cartsModels;

