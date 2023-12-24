const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    des : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const reviewModel = mongoose.model("reviews",dataSchema);

module.exports = reviewModel;