const  mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    invoiceID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productID : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    price: {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false})

const invoiceproductsModel = mongoose.model("invoiceproducts",dataSchema);

module.exports = invoiceproductsModel
