const  mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    shortDes : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    discount : {
        type : Boolean,
        required : true
    },
    discountPrice : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    star : {
        type : String,
        required : true
    },
    stock : {
        type : Boolean,
        required : true
    },
    remark : {
        type : String,
        required : true
    },
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true
    },
    brandID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        unique : true
    }
},{timestamps:true,versionKey:false});

const productsModel = mongoose.model("products",dataSchema);

module.exports = productsModel